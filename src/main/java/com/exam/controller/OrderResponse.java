package com.exam.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public class OrderResponse {

	String secretKey;
	String razorpayOrderId;
	String applicationFee;
	String secretId;
	String pgName;
    boolean isFeesPaid;
	public String getPgName() {
		return pgName;
	}

	public void setPgName(String pgName) {
		this.pgName = pgName;
	}

	public String getSecretId() {
		return secretId;
	}

	public void setSecretId(String secretId) {
		this.secretId = secretId;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	public String getRazorpayOrderId() {
		return razorpayOrderId;
	}

	public void setRazorpayOrderId(String razorpayOrderId) {
		this.razorpayOrderId = razorpayOrderId;
	}

	public String getApplicationFee() {
		return applicationFee;
	}

	public void setApplicationFee(String applicationFee) {
		this.applicationFee = applicationFee;
	}

	public boolean isFeesPaid() {
		return isFeesPaid;
	}

	public void setFeesPaid(boolean isFeesPaid) {
		this.isFeesPaid = isFeesPaid;
	}

}
