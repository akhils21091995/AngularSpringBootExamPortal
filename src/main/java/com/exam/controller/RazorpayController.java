package com.exam.controller;

import java.math.BigInteger;

import org.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.exam.model.User;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins="http://localhost:4200")
public class RazorpayController {

	private RazorpayClient client;
	private static final String SECRET_ID= "rzp_test_sIOgRCrbL1mvuL";
	private static final String SECRET_KEY = "ftkkMxnQ2NlQNAVMZJiOxcTo";
	

	@PostMapping("/create-order")
	public OrderResponse createOrder(@RequestBody User orderRequest) {
		OrderResponse response = new OrderResponse();
		try {

	
				client = new RazorpayClient(SECRET_ID, SECRET_KEY);
			

			Order order = createRazorPayOrder(orderRequest.getAmount());
			System.out.println("---------------------------");
			String orderId = order.get("id");
			System.out.println("Order ID: " + orderId);
			System.out.println("---------------------------");
			response.setRazorpayOrderId(orderId);
			response.setApplicationFee("" + orderRequest.getAmount());
				response.setSecretKey(SECRET_KEY);
				response.setSecretId(SECRET_ID);
				response.setPgName("razor1");
			    response.isFeesPaid();

			return response;
		} catch (RazorpayException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return response;

	}

	private Order createRazorPayOrder(BigInteger amount) throws RazorpayException {

		JSONObject options = new JSONObject();
		options.put("amount", amount.multiply(new BigInteger("1")));
		options.put("currency", "INR");
		options.put("receipt", "txn_123456");
		options.put("payment_capture", 1); // You can enable this if you want to do Auto Capture.
		return client.orders.create(options);
	}
	
}