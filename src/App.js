import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Form, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

function App() {
  const [features, setFeatures] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFeatures(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page refresh 🚀

    const featureArray = features.split(",").map((f) => f.trim());

    if (
      featureArray.length !== 29 ||
      featureArray.some((f) => isNaN(f) || f === "")
    ) {
      alert("Please enter exactly 29 numerical features separated by commas.");
      return;
    }

    const numericFeatures = featureArray.map(Number);

    try {
      const response = await axios.post(
        "https://creditcardfraudapi.onrender.com/predict",
        {
          features: numericFeatures,
        }
      );
      setResult(response.data.fraud);
      setFeatures("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get prediction.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 ">
      <Row className="w-100 d-flex align-items-center">
        <Col
          md={6}
          className="d-flex justify-content-center justify-content-md-start"
        >
          <motion.h2
            className="text-center fw-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }} // Smooth scale-in
            style={{ color: "whitesmoke" }}
          >
            Credit Card Fraud Detection
          </motion.h2>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6, // ⏳ Slightly longer for smoothness
              ease: "easeInOut", // 🎭 Natural movement
            }} // Increased duration
          >
            <Card className="p-4 shadow-lg card-responsive">
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Enter 29 Features (Comma-Separated)</Form.Label>
                    <motion.input
                      type="text"
                      value={features}
                      onChange={handleChange}
                      placeholder="e.g., 1.2, 3.4, 5.6, ..., 7.8"
                      className="form-control"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }} // 📌 Smooth input animation
                    />
                  </Form.Group>
                  <div className="text-center mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Check Fraud
                    </motion.button>
                  </div>
                </Form>
                {result !== null && (
                  <motion.h4
                    className="text-center mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }} // Slower animation for stability
                  >
                    Fraud Prediction:{" "}
                    <span
                      className={result === 1 ? "text-danger" : "text-success"}
                    >
                      {result === 1
                        ? "🚨 Fraudulent Transaction"
                        : "✅ Legitimate Transaction"}
                    </span>
                  </motion.h4>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
