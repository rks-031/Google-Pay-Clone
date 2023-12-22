const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.port || 4000;

app.use(bodyParser.json()); // to incoming JSON data

// User data and transaction structure
const users = {
  1234567890: {
    phoneNum: "1234567890",
    availableAmount: 1000,
    transactions: [],
  },
  9876543210: {
    phoneNum: "9876543210",
    availableAmount: 1500,
    transactions: [],
  },
};

// Function to log in or create a new user
app.post("/login", (req, res) => {
  const { phoneNum } = req.body;

  if (!users[phoneNum]) {
    // New user, add to the dictionary
    const initialAmount = parseFloat(req.body.initialAmount);
    users[phoneNum] = {
      phoneNum: phoneNum,
      availableAmount: initialAmount,
      transactions: [],
    };
  }

  res.json({ message: "Logged in successfully!" });
});

// Function to transfer amount between users
app.post("/transfer", (req, res) => {
  const { from, to, amount } = req.body;

  const sender = users[from];
  const recipient = users[to];

  if (!sender || !recipient) {
    return res.status(400).json({ error: "Invalid sender or recipient." });
  }

  if (sender.availableAmount < amount) {
    return res.status(400).json({ error: "Insufficient balance." });
  }

  // Deduct amount from sender
  sender.availableAmount -= amount;

  // Credit amount to recipient
  recipient.availableAmount += amount;

  // Record the transaction
  const transaction = { from, to, amount };
  sender.transactions.push(transaction);
  recipient.transactions.push(transaction);

  // Cashback handling
  handleCashback(amount, from);

  res.json({ message: "Transaction successful!" });
});

// Function to handle cashback
function handleCashback(amount, userNum) {
  if (amount % 500 === 0) {
    console.log("Better luck next time! No cashback.");
  } else if (amount < 1000) {
    const cashback = amount * 0.05;
    users[userNum].availableAmount += cashback;
    console.log(`Congratulations! You received a 5% cashback of ${cashback}!`);
  } else {
    const cashback = amount * 0.02;
    users[userNum].availableAmount += cashback;
    console.log(`Congratulations! You received a 2% cashback of ${cashback}!`);
  }
}

// Function to display user information
app.get("/user/:phoneNum", (req, res) => {
  const user = users[req.params.phoneNum];
  if (user) {
    res.json({
      phoneNum: user.phoneNum,
      availableAmount: user.availableAmount,
      transactions: user.transactions,
    });
  } else {
    res.status(404).json({ error: "User not found." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
