"use client";

import { useEffect, useState } from "react";
import { Check, CheckCircle2, Copy, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const UPI_ID = "ramsagarexposer@oksbi";
const PLAN_AMOUNT = "10";
const STORAGE_KEY = "viewverse-premium-status";

function isPremiumUnlocked(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(STORAGE_KEY) === "active";
  } catch {
    return false;
  }
}

export default function PremiumCheckout() {
  const [copied, setCopied] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    setIsUnlocked(isPremiumUnlocked());
  }, []);

  const payLink = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent("ViewVerse Premium")}&am=${encodeURIComponent(PLAN_AMOUNT)}&cu=INR&tn=${encodeURIComponent("ViewVerse Premium Test")}`;

  const openUpi = () => {
    setShowPaymentModal(true);

    try {
      const popup = window.open(payLink, "_blank", "noopener,noreferrer");
      if (!popup) {
        window.location.href = payLink;
      }
    } catch {
      window.location.href = payLink;
    }
  };

  const confirmPayment = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "active");
    } catch {
      // Ignore storage errors and still unlock in-memory.
    }

    setIsUnlocked(true);
    setShowPaymentModal(false);
  };

  const cancelPayment = () => {
    setShowPaymentModal(false);
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  if (hidden) {
    return (
      <div className="premium-card premium-card-hidden">
        <p>Premium checkout is hidden. Use the toggle below to bring it back.</p>
        <button type="button" className="secondary-button" onClick={() => setHidden(false)}>
          Show Premium
        </button>
      </div>
    );
  }

  if (isUnlocked) {
    return (
      <div className="premium-card glass-panel premium-card-active">
        <div className="premium-header">
          <div>
            <span className="premium-badge premium-badge-success">Premium Active</span>
            <h3>ViewVerse Premium Unlocked</h3>
          </div>
          <div className="premium-price-wrap">
            <span className="premium-price">₹{PLAN_AMOUNT}</span>
            <span className="premium-period">/ 1 month</span>
          </div>
        </div>

        <ul className="premium-features">
          <li><CheckCircle2 size={16} /> Premium access enabled</li>
          <li><ShieldCheck size={16} /> Priority access experience</li>
          <li><Sparkles size={16} /> Premium profile badge</li>
          <li><Wallet size={16} /> UPI payment verified</li>
        </ul>

        <div className="premium-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              try {
                window.localStorage.removeItem(STORAGE_KEY);
              } catch {
                // Ignore storage errors.
              }
              setIsUnlocked(false);
            }}
          >
            Reset Premium
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="premium-card glass-panel">
        <div className="premium-header">
          <div>
            <span className="premium-badge">TEST PREMIUM</span>
            <h3>ViewVerse Premium</h3>
          </div>
          <div className="premium-price-wrap">
            <span className="premium-price">₹{PLAN_AMOUNT}</span>
            <span className="premium-period">/ 1 month</span>
          </div>
        </div>

        <ul className="premium-features">
          <li><Check size={16} /> Ad-free streaming test</li>
          <li><ShieldCheck size={16} /> Priority access experience</li>
          <li><Sparkles size={16} /> Premium profile badge</li>
          <li><Wallet size={16} /> UPI payment mode</li>
        </ul>

        <div className="premium-upi-box">
          <label>UPI ID</label>
          <div className="premium-upi-row">
            <strong>{UPI_ID}</strong>
            <button type="button" className="copy-button" onClick={copyUpi}>
              <Copy size={14} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="premium-actions">
          <button type="button" className="primary-button" onClick={openUpi}>
            Pay ₹{PLAN_AMOUNT} with UPI
          </button>
          <button type="button" className="secondary-button" onClick={() => setHidden(true)}>
            Hide Premium
          </button>
        </div>
      </div>

      {showPaymentModal && (
        <div className="payment-modal-backdrop" onClick={cancelPayment}>
          <div className="payment-modal glass-panel" onClick={(event) => event.stopPropagation()}>
            <h4>Complete your payment</h4>
            <p>
              We tried to open your UPI app. If it didn&apos;t open, pay this UPI ID manually and then confirm below.
            </p>
            <div className="premium-upi-box payment-modal-box">
              <label>UPI ID</label>
              <div className="premium-upi-row">
                <strong>{UPI_ID}</strong>
                <button type="button" className="copy-button" onClick={copyUpi}>
                  <Copy size={14} /> {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="premium-actions payment-modal-actions">
              <button type="button" className="primary-button" onClick={confirmPayment}>
                I have paid
              </button>
              <button type="button" className="secondary-button" onClick={cancelPayment}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
