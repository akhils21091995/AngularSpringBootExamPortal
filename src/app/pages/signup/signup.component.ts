import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare var Razorpay: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  paymentId: string;
  error: string;
  isPaymentDone: boolean;
  
  constructor(private userService: UserService, private orderService: OrderServiceService, private snack: MatSnackBar) { 
    this.isPaymentDone =false;
  }
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: '',
  };

  options = {
    "key": "",
    "amount": "",
    "isFeesPaid": "",
    "name": "Coding World",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id": "",
    "handler": function (response) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  ngOnInit(): void { }

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required !!');
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password == '' || this.user.password == null) {
      // alert('User is required !!');
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.user.email == '' || this.user.email == null) {
      // alert('Email is required !!');
      this.snack.open('Email is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    if (this.user.amount == '' || this.user.amount == null) {
      // alert('Amount is required !!');
      this.snack.open('Amount is required !! ', '', {
        duration: 3000,
      });
      return;
    }
//validate user
//addUser: userservice
 
this.userService.addUser(this.user).subscribe(
  (data: any) => {
    //success
    console.log(data);
    //alert('success');
    Swal.fire(' Registration done !!', 'User id is ' + data.id, 'success');
  },
  (error) => {
    //error
    console.log(error);
    
  }
);
    
}
  
payFees(){
  this.paymentId = '';
    this.error = '';
    this.orderService.createOrder(this.user).subscribe(
       (data: any)=> {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = "Akhil's Exam Portal";
        this.options.prefill.email = "java.it.akhil@gmail.com";
        this.options.prefill.contact = "8840411695";
        this.options.image = "";
        var rzp1 = new Razorpay(this.options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
          // Todo - store this information in the server
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
        }
        );
       
      }
      ,
      err => {
        this.error = err.error.message;
      }
     
    );
    
}
@HostListener('window:payment.success', ['$event'])
onPaymentSuccess(event): void {
  console.log(event.detail);
  // after validating 
  if(event.detail.razorpay_payment_id != null){
    this.isPaymentDone=true;
    this.formSubmit();
  }
} 

}



