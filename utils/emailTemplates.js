export const welcomeTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to YoTukka</title>
<style>
  body {
    font-family: 'Poppins', sans-serif;
    background-color: #f7f9fc;
    margin: 0;
    padding: 0;
    color: #333;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  .header {
    background: linear-gradient(135deg, #4e8cff, #1b66ff);
    color: white;
    padding: 30px 20px;
    text-align: center;
  }
  .content {
    padding: 30px 25px;
  }
  h1 {
    margin-top: 0;
    color: #1b66ff;
  }
  .button {
    display: inline-block;
    margin-top: 20px;
    background-color: #1b66ff;
    color: white;
    text-decoration: none;
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .footer {
    text-align: center;
    padding: 20px;
    font-size: 12px;
    color: #aaa;
    background: #f1f3f5;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to YoTukka 🚀</h2>
    </div>
    <div class="content">
      <h1>Hi ${name},</h1>
      <p>We're thrilled to have you join <strong>YoTukka</strong>! Your account is now ready — you can explore our platform, manage your projects, and connect seamlessly with your clients.</p>
      <p>Let’s make something amazing together!</p>
      <a href="https://yotukka.com" class="button">Go to Dashboard</a>
      <p style="margin-top: 30px;">If you didn’t sign up for this account, please ignore this email.</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} YoTukka — All rights reserved with AB Team.
    </div>
  </div>
</body>
</html>
`;

// order status changing email
export const orderStatusTemplate = (username, orderId, status) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Status Updated</title>
  <style>
    body {
      font-family: 'Poppins', sans-serif;
      background-color: #f7f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #4e8cff, #1b66ff);
      color: #fff;
      text-align: center;
      padding: 25px 15px;
    }
    .content {
      padding: 25px;
      color: #333;
    }
    .status-box {
      background: #eef4ff;
      border-left: 5px solid #1b66ff;
      padding: 15px;
      margin: 15px 0;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      font-size: 13px;
      color: #999;
      background: #f1f3f5;
      padding: 20px;
    }
    .button {
      background-color: #1b66ff;
      color: #fff;
      text-decoration: none;
      padding: 10px 22px;
      border-radius: 8px;
      display: inline-block;
      margin-top: 15px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Order Update 🔔</h2>
    </div>
    <div class="content">
      <h3>Hi ${username},</h3>
      <p>We wanted to let you know that your order status has changed.</p>
      <div class="status-box">
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>New Status:</strong> ${status.toUpperCase()}</p>
      </div>
      <a href="https://yotukka.com/api/v1/order/${orderId}" class="button">View Order Details</a>
      <p style="margin-top:20px;">We'll continue to update you as your order progresses!</p>
    </div>
    <div class="footer">
      © ${new Date().getFullYear()} YoTukka — All rights reserved with AB Team.
    </div>
  </div>
</body>
</html>
`;

// when places email
export const orderTemplate = (username, orderId, products, totalAmount) => {
  const itemsHTML = products
    .map(
      (p) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${p.name}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${p.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">₹${p.price}</td>
        </tr>
      `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: 'Poppins', sans-serif;
        background-color: #f7f9fc;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .header {
        background: linear-gradient(135deg, #4e8cff, #1b66ff);
        color: #fff;
        text-align: center;
        padding: 25px 15px;
      }
      .content {
        padding: 25px;
        color: #333;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      .total {
        text-align: right;
        font-size: 18px;
        font-weight: 600;
        margin-top: 15px;
      }
      .footer {
        text-align: center;
        font-size: 13px;
        color: #999;
        background: #f1f3f5;
        padding: 20px;
      }
      .button {
        background-color: #1b66ff;
        color: #fff;
        text-decoration: none;
        padding: 10px 22px;
        border-radius: 8px;
        display: inline-block;
        margin-top: 15px;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Order Confirmed 🎉</h2>
      </div>
      <div class="content">
        <h3>Hello ${username},</h3>
        <p>Thank you for your order! Your order has been successfully placed.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <table>
          <thead>
            <tr>
              <th align="left">Product</th>
              <th align="left">Qty</th>
              <th align="left">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>
        <p class="total">Total: ₹${totalAmount}</p>
        <a href="https://yotukka.com/api/v1/order/${orderId}" class="button">View Order</a>
        <p style="margin-top:20px;">We’ll notify you when your items are shipped.</p>
      </div>
      <div class="footer">
        © ${new Date().getFullYear()} YoTukka — All rights reserved with AB Team.
      </div>
    </div>
  </body>
  </html>
  `;
};

// admin email to notify order came
export const adminOrderTemplate = (
  username,
  userEmail,
  orderId,
  products,
  totalAmount,
  shippingAddress
) => {
  return `
    <h2>New Order Received</h2>

    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Customer:</strong> ${username}</p>
    <p><strong>Email:</strong> ${userEmail}</p>

    <h3>Products</h3>
    <ul>
      ${products
        .map(
          (p) => `<li>${p.name} — Qty: ${p.quantity} — ₹${p.price} each</li>`
        )
        .join("")}
    </ul>

    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>

    <h3>Shipping Address</h3>
    <p>${shippingAddress}</p>

    <p style="margin-top:20px;">Go check admin dashboard for more details.</p>
  `;
};
