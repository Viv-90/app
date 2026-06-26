import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { useAppNavigation } from "../context/NavigationContext";
import { Ionicons } from "../components/Ionicons";
import { fonts, shadows } from "../theme";

export const DepositScreen = ({ onAddMoney }: { onAddMoney: (amt: number) => void }) => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();
  const [tab, setTab] = useState<"deposit" | "request">("deposit");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [depositSuccess, setDepositSuccess] = useState(false);

  const depositMethods = [
    { icon: "business-outline", label: "Bank Transfer", desc: "1-2 business days", badge: "Free" },
    { icon: "card-outline", label: "Debit/Credit Card", desc: "Instant", badge: "1.5% fee" },
    { icon: "phone-portrait-outline", label: "Mobile Money", desc: "Instant", badge: "Free" },
  ];

  const handleDepositClick = (methodLabel: string) => {
    setSelectedMethod(methodLabel);
    setAmount("");
  };

  const handleKeyPress = (val: string) => {
    if (val === "del") setAmount((p) => p.slice(0, -1));
    else if (val === "." && !amount.includes(".")) setAmount((p) => p + ".");
    else if (val !== ".") {
      if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
      setAmount((p) => p + val);
    }
  };

  const handleDepositConfirm = () => {
    const val = parseFloat(amount);
    if (!val || isNaN(val)) return;
    onAddMoney(val);
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setSelectedMethod(null);
      setAmount("");
      goBack();
    }, 1200);
  };

  const handleBack = () => {
    if (selectedMethod) {
      setSelectedMethod(null);
      setAmount("");
    } else {
      goBack();
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={handleBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>
          {selectedMethod ? `Deposit via ${selectedMethod}` : "Add Money"}
        </span>
      </div>

      {depositSuccess ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0" }} className="fade-in">
          <div style={{ width: "88px", height: "88px", borderRadius: "50%", backgroundColor: c.success, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", boxShadow: "0 10px 24px rgba(46, 158, 106, 0.25)" }}>
            <Ionicons name="checkmark" size={36} color="#fff" />
          </div>
          <div style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, marginBottom: "8px" }}>Deposit Successful!</div>
          <div style={{ fontSize: "16px", color: c.mutedForeground }}>
            ${parseFloat(amount).toFixed(2)} added via {selectedMethod}
          </div>
        </div>
      ) : selectedMethod ? (
        <div className="glass-card responsive-card" style={{ borderRadius: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "52px", fontWeight: "800", letterSpacing: "-1.5px", color: c.foreground, marginBottom: "32px", fontFamily: fonts.display }}>
            ${amount || "0"}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "280px", width: "100%", marginBottom: "32px" }}>
            {["1","2","3","4","5","6","7","8","9",".","0","del"].map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                style={{
                  width: "33.33%",
                  padding: "16px 0",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: c.foreground,
                  borderRadius: "16px",
                }}
                className="keypad-key"
              >
                {key === "del" ? "⌫" : key}
              </button>
            ))}
          </div>

          <button
            disabled={!amount || parseFloat(amount) === 0}
            onClick={handleDepositConfirm}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "20px",
              background: `linear-gradient(135deg, ${c.gradientAccent[0]}, ${c.gradientAccent[1]})`,
              color: "#fff",
              fontWeight: "700",
              fontSize: "16px",
              boxShadow: "0 10px 20px rgba(26, 158, 122, 0.15)",
              opacity: (!amount || parseFloat(amount) === 0) ? 0.4 : 1,
            }}
          >
            Confirm Deposit
          </button>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "6px", borderRadius: "18px", padding: "6px", backgroundColor: c.secondary, marginBottom: "28px" }}>
            <button
              onClick={() => { setTab("deposit"); setAmount(""); }}
              style={{ flex: 1, padding: "12px", borderRadius: "14px", fontWeight: "700", fontSize: "14px", color: tab === "deposit" ? c.foreground : c.mutedForeground, backgroundColor: tab === "deposit" ? c.card : "transparent", boxShadow: tab === "deposit" ? shadows.card : "none", transition: "all 0.2s" }}
            >
              Deposit Methods
            </button>
            <button
              onClick={() => { setTab("request"); setAmount(""); }}
              style={{ flex: 1, padding: "12px", borderRadius: "14px", fontWeight: "700", fontSize: "14px", color: tab === "request" ? c.foreground : c.mutedForeground, backgroundColor: tab === "request" ? c.card : "transparent", boxShadow: tab === "request" ? shadows.card : "none", transition: "all 0.2s" }}
            >
              Request Money Link
            </button>
          </div>

          {tab === "deposit" && (
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
                CHOOSE DEPOSIT METHOD
              </div>
              {depositMethods.map((m) => (
                <div
                  key={m.label}
                  onClick={() => handleDepositClick(m.label)}
                  style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", borderRadius: "24px", backgroundColor: c.card, border: `1px solid ${c.border}50`, marginBottom: "14px", cursor: "pointer", boxShadow: shadows.card }}
                  className="tx-item-hover"
                >
                  <div style={{ width: "48px", height: "48px", borderRadius: "16px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name={m.icon} size={22} color={c.primary} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{m.label}</div>
                    <div style={{ fontSize: "13px", color: c.mutedForeground }}>{m.desc}</div>
                  </div>
                  <div style={{ padding: "6px 12px", borderRadius: "12px", backgroundColor: `${c.primary}12`, fontSize: "12px", fontWeight: "700", color: c.primary }}>
                    {m.badge}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "request" && (
            <div className="glass-card responsive-card" style={{ borderRadius: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "24px", backgroundColor: `${c.primary}1a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <Ionicons name="link" size={30} color={c.primary} />
              </div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: c.foreground }}>Create Request Link</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground, marginBottom: "32px" }}>Create a link to request money from anyone</div>

              <div style={{ fontSize: "52px", fontWeight: "800", letterSpacing: "-1.5px", color: c.foreground, marginBottom: "32px", fontFamily: fonts.display }}>
                ${amount || "0"}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "280px", width: "100%", marginBottom: "32px" }}>
                {["1","2","3","4","5","6","7","8","9",".","0","del"].map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (key === "del") setAmount((p) => p.slice(0, -1));
                      else if (key === "." && amount.includes(".")) return;
                      else setAmount((p) => p + key);
                    }}
                    style={{
                      width: "33.33%",
                      padding: "16px 0",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: c.foreground,
                      borderRadius: "16px",
                    }}
                    className="keypad-key"
                  >
                    {key === "del" ? "⌫" : key}
                  </button>
                ))}
              </div>

              <button
                disabled={!amount || parseFloat(amount) === 0}
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${c.gradientAccent[0]}, ${c.gradientAccent[1]})`,
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 10px 20px rgba(26, 158, 122, 0.15)",
                  opacity: (!amount || parseFloat(amount) === 0) ? 0.4 : 1,
                }}
              >
                {copied ? "Link Copied!" : "Create Request Link"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
