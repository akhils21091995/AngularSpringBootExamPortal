package com.exam.controller;

public class PaymentFailedException extends Exception {
	 /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public PaymentFailedException() {
	        super("Payment Failed !! Please retry with another method");
	    }

	    public PaymentFailedException(String msg)
	    {
	        super(msg);
	    }
}
