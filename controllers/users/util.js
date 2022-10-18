const jwt = require("jsonwebtoken");
const FCM = require("fcm-node");

const createToken = (user, expiresIn = process.env.JWT_EXPIRATION) => {
  const payload = {
    _id: user._id,
    userName: user.userName,
    phone: user.phone,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

const createRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, type: "refresh" },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION_REFRESH,
    }
  );
};

const sendfcmNotification = (
  notificationTitle,
  notificationBody,
  notificationData,
  deviceToken,
  serverKey = process.env.SERVER_KEY
) => {
  var fcm = new FCM(serverKey);
  var message = {
    to: deviceToken,
    notification: {
      title: notificationTitle,
      body: notificationBody,
    },

    data: notificationData,
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!" + err);
      console.log("FCM Response: " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("Successfully sent with response: ", response);
    }
  });
};

module.exports = {
  createToken,
  createRefreshToken,
  sendfcmNotification,
};
