const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const SSLCommerzPayment = require("sslcommerz-lts");

// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASS;
const is_live = false;

// console.log(store_id, store_passwd);

const paymentSchema = require("../schemas/paymentSchema");

const Payment = mongoose.model("Payment", paymentSchema);

router.get("/", async (req, res) => {
  try {
    const users = await Payment.find({ paidStatus: "paid" }, "name paidStatus");
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching Premum user", error: error.message });
  }
});

// router.post("/", async (req, res) => {
//   const payment = req.body;
//   const newTransactionId = new mongoose.Types.ObjectId().toString();
//   const data = {
//     total_amount: payment?.amount,
//     currency: payment?.currency,
//     tran_id: newTransactionId,
//     success_url: `http://localhost:5000/payment/success/${newTransactionId}`,
//     fail_url: "http://localhost:3030/fail",
//     cancel_url: "http://localhost:3030/cancel",
//     ipn_url: "http://localhost:3030/ipn",
//     shipping_method: "Courier",
//     product_name: "Computer.",
//     product_category: "Electronic",
//     product_profile: "general",
//     cus_name: payment?.name,
//     cus_email: payment?.email,
//     cus_add1: payment?.address,
//     cus_add2: "Dhaka",
//     cus_city: "Dhaka",
//     cus_state: "Dhaka",
//     cus_postcode: "1000",
//     cus_country: "Bangladesh",
//     cus_phone: payment?.number,
//     cus_fax: "01711111111",
//     ship_name: "Customer Name",
//     ship_add1: "Dhaka",
//     ship_add2: "Dhaka",
//     ship_city: "Dhaka",
//     ship_state: "Dhaka",
//     ship_postcode: 1000,
//     ship_country: "Bangladesh",
//   };

//   //   console.log(data, payment);
//   const sslcz = new SSLCommerzPayment(
//     "flexc64e501ed3c650",
//     "flexc64e501ed3c650@ssl",
//     is_live
//   );

//   sslcz.init(data).then((apiResponse) => {
//     // Redirect the user to payment gateway
//     let GatewayPageURL = apiResponse.GatewayPageURL;
//     res.send({ url: GatewayPageURL });

//     const finalOrder = {
//       name: payment?.name,
//       email: payment?.email,
//       number: payment?.number,
//       address: payment?.address,
//       amount: payment?.amount,
//       currency: payment?.currency,
//       transactionId: newTransactionId,
//       access: "life time",
//       paidStatus: "Unpaid",
//     };

//     console.log("final order ", finalOrder);

//     // const newFinalInstance = new Payment(finalOrder);
//     // await newFinalInstance.save();

//     res.status(200).json({
//       message: "finalOrder was inserted successfully",
//       //   order: newFinalInstance,
//     });
//     // console.log("Redirecting to: ", GatewayPageURL);
//   });
// });
router.post("/", async (req, res) => {
  const payment = req.body;
  const newTransactionId = new mongoose.Types.ObjectId().toString();
  const data = {
    total_amount: payment?.amount,
    currency: payment?.currency,
    tran_id: newTransactionId,
    success_url: `http://localhost:5000/payment/success/${newTransactionId}`,
    fail_url: `http://localhost:5000/payment/fail/${newTransactionId}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: payment?.name,
    cus_email: payment?.email,
    cus_add1: payment?.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: payment?.number,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  try {
    const sslcz = new SSLCommerzPayment(
      "flexc64e501ed3c650",
      "flexc64e501ed3c650@ssl",
      is_live
    );

    const apiResponse = await sslcz.init(data);

    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.send({ url: GatewayPageURL });
    const finalOrder = {
      name: payment?.name,
      email: payment?.email,
      number: payment?.number,
      address: payment?.address,
      amount: payment?.amount,
      currency: payment?.currency,
      transactionId: newTransactionId,
      access: "life time",
      paidStatus: "Unpaid",
      time: new Date(),
    };

    const newFinalInstance = new Payment(finalOrder);
    await newFinalInstance.save();

    res.send({ url: GatewayPageURL });
  } catch (error) {
    console.error("Error during payment initiation:", error);
    res
      .status(500)
      .json({ error: "An error occurred during payment initiation." });
  }

  router.post("/success/:tranId", async (req, res) => {
    console.log(" SUCCESS FULL ID SENT", req.params.tranId);

    const paidUser = await Payment.updateOne(
      {
        transactionId: req.params.tranId,
      },
      {
        $set: {
          paidStatus: "paid",
        },
      }
    );
    if (paidUser.modifiedCount > 0) {
      res.redirect(`http://localhost:5173/payment/success/${newTransactionId}`);
    }
    console.log("success route ", paidUser);

    // res.redirect(`http://localhost:5173/payment/success/${newTransactionId}`);
  });

  router.post("/fail/:tranId", async (req, res) => {
    console.log(" fail ", req.params.tranId);

    res.redirect(`http://localhost:5173/payment/fail/${newTransactionId}`);
    const unPaidUser = await Payment.deleteOne({
      transactionId: req.params.tranId,
    });
    if (unPaidUser.deletedCount) {
      res.redirect(`http://localhost:5173/payment/fail/${newTransactionId}`);
    }
    console.log("fail route ", unPaidUser);
  });
});

router.get("/:tranId", async (req, res) => {
  // console.log("from success and login", req.params.tranId);

  const paidUser = await Payment.findOne({
    transactionId: req.params.tranId,
  });
  res.send(paidUser);
});

module.exports = router;
