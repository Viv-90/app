import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fonts, shadows } from "./theme";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { NavigationProvider, useAppNavigation, type ScreenName } from "./context/NavigationContext";
import { currentUser as initialUser, contacts, initialTransactions, type Transaction } from "./data/mockData";
import { Ionicons } from "./components/Ionicons";

// ==========================================
// Icon & Sub-Components
// ==========================================

const ActionButtons = () => {
  const { c } = useTheme();
  const { navigate } = useAppNavigation();

  const actions = [
    { icon: "arrow-forward", label: "Transfer", route: "Send" as ScreenName, rotation: -45 },
    { icon: "add-circle-outline", label: "Deposit", route: "Deposit" as ScreenName },
    { icon: "piggy-bank-outline", label: "Save", route: "Save" as ScreenName },
    { icon: "bar-chart-outline", label: "Invest", route: "Invest" as ScreenName },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", margin: "24px 0" }}>
      {actions.map((action, i) => (
        <div
          key={action.label}
          onClick={() => navigate(action.route)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          {i === 0 ? (
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                background: `linear-gradient(135deg, ${c.gradientAccent[0]}, ${c.gradientAccent[1]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: shadows.card,
                transition: "transform 0.2s ease",
              }}
              className="action-btn-hover"
            >
              <Ionicons name={action.icon} size={22} color="#fff" style={{ transform: `rotate(${action.rotation || 0}deg)` }} />
            </div>
          ) : (
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                backgroundColor: c.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease",
              }}
              className="action-btn-hover"
            >
              <Ionicons name={action.icon} size={22} color={c.foreground} />
            </div>
          )}
          <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground, letterSpacing: "0.2px" }}>
            {action.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const BalanceCard = ({ balance }: { balance: number }) => {
  const { c } = useTheme();
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="balance-card-responsive"
      style={{
        background: `linear-gradient(135deg, ${c.gradientBalance[0]}, ${c.gradientBalance[1]} 50%, ${c.gradientBalance[2]})`,
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 12px 30px rgba(51, 51, 160, 0.2)",
      }}
    >
      {/* Ring shapes */}
      <div style={{ position: "absolute", top: "-64px", right: "-64px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "-32px", right: "-32px", width: "140px", height: "140px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "12px", fontWeight: "700", color: "rgba(255,255,255,0.7)", letterSpacing: "1.5px" }}>
          AVAILABLE BALANCE
        </span>
        <button
          onClick={() => setVisible(!visible)}
          style={{
            padding: "8px",
            borderRadius: "12px",
            backgroundColor: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <Ionicons name={visible ? "eye-outline" : "eye-off-outline"} size={16} color="#fff" />
        </button>
      </div>

      <div style={{ fontSize: "44px", fontWeight: "800", letterSpacing: "-1.5px", marginBottom: "16px", fontFamily: fonts.display }}>
        {visible ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c993" }} />
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", fontWeight: "500", letterSpacing: "0.2px" }}>
          All systems active
        </span>
      </div>
    </div>
  );
};

const QuickContacts = () => {
  const { c } = useTheme();
  const { navigate } = useAppNavigation();

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
        QUICK SEND
      </div>
      <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "12px", scrollbarWidth: "none" }} className="custom-scroll">
        <div
          onClick={() => navigate("Send")}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "20px",
              border: `2px dashed ${c.primary}50`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="add" size={22} color={c.primary} />
          </div>
          <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground }}>New</span>
        </div>

        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => navigate("Send", { to: contact.username })}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={contact.avatar}
                alt={contact.name}
                style={{ width: "56px", height: "56px", borderRadius: "20px", backgroundColor: c.secondary, objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px",
                  right: "-2px",
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                  backgroundColor: c.success,
                  border: `2.5px solid ${c.background}`,
                }}
              />
            </div>
            <span style={{ fontSize: "12px", fontWeight: "600", color: c.mutedForeground }}>{contact.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TransactionItem = ({ transaction, onClick }: { transaction: Transaction; onClick: () => void }) => {
  const { c } = useTheme();
  const isReceived = transaction.type === "received";

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 18px",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      className="tx-item-hover"
    >
      <div style={{ position: "relative" }}>
        <img
          src={transaction.avatar}
          alt={transaction.name}
          style={{ width: "48px", height: "48px", borderRadius: "18px", backgroundColor: c.secondary, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            right: "-4px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: isReceived ? c.success : c.primary,
            border: `2px solid ${c.card}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={10}
            color="#fff"
            style={{ transform: `rotate(${isReceived ? "135deg" : "-45deg"})` }}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "3px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{transaction.name}</span>
          <span style={{ fontSize: "15px", fontWeight: "800", color: isReceived ? c.success : c.foreground }}>
            {isReceived ? "+" : "−"}${transaction.amount.toFixed(2)}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: c.mutedForeground, maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {transaction.note || (isReceived ? "Received" : "Sent")}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {transaction.status === "pending" && (
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: c.warning }} />
            )}
            <span style={{ fontSize: "12px", color: c.mutedForeground }}>{transaction.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Screens Layout
// ==========================================

const HomeScreen = ({ txs }: { txs: Transaction[] }) => {
  const { c } = useTheme();
  const { navigate } = useAppNavigation();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetingIcon = hour < 12 ? "sunny-outline" : hour < 18 ? "partly-sunny-outline" : "moon-outline";

  return (
    <div className="fade-in">
      {/* Top Header Greetings */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: c.mutedForeground }}>{greeting}</span>
            <Ionicons name={greetingIcon} size={14} color={c.mutedForeground} />
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-1px" }}>
            Welcome back, {initialUser.name}!
          </h1>
        </div>

        <button
          onClick={() => navigate("Notifications")}
          style={{
            position: "relative",
            width: "44px",
            height: "44px",
            borderRadius: "16px",
            border: `1px solid ${c.border}80`,
            backgroundColor: c.card,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: shadows.card,
          }}
        >
          <Ionicons name="notifications-outline" size={20} color={c.foreground} />
          <div style={{ position: "absolute", top: "10px", right: "10px", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: c.primary, border: `1.5px solid ${c.card}` }} />
        </button>
      </div>

      {/* Main Responsive Grid */}
      <div className="dashboard-grid">
        {/* Left main column */}
        <div>
          <BalanceCard balance={initialUser.balance} />
          <ActionButtons />
          <QuickContacts />
        </div>

        {/* Right column */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px" }}>
              RECENT TRANSACTIONS
            </span>
            <span
              onClick={() => navigate("Tabs")} // Triggers bottom activity naturally on mobile
              style={{ fontSize: "13px", fontWeight: "600", color: c.primary, cursor: "pointer" }}
            >
              See all
            </span>
          </div>
          <div className="glass-card" style={{ borderRadius: "28px", padding: "10px" }}>
            {txs.slice(0, 5).map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onClick={() => navigate("TransactionDetail", { id: tx.id })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SendScreen = ({ onAddTransaction }: { onAddTransaction: (tx: Omit<Transaction, "id" | "date" | "status">) => void }) => {
  const { c } = useTheme();
  const { goBack, params } = useAppNavigation();
  const preselected = params?.to;

  const [step, setStep] = useState<"recipient" | "amount" | "confirm">(preselected ? "amount" : "recipient");
  const [query, setQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<any>(
    preselected ? contacts.find((co) => co.username === preselected) || null : null
  );
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);

  const filtered = useMemo(
    () => contacts.filter((co) => co.name.toLowerCase().includes(query.toLowerCase()) || co.username.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const handleKeyPress = (val: string) => {
    if (val === "del") setAmount((p) => p.slice(0, -1));
    else if (val === "." && !amount.includes(".")) setAmount((p) => p + ".");
    else if (val !== ".") {
      if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
      setAmount((p) => p + val);
    }
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      onAddTransaction({
        type: "sent",
        name: selectedContact.name,
        username: selectedContact.username,
        avatar: selectedContact.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200",
        amount: parseFloat(amount),
        note: note,
      });
      // Deduct balance
      initialUser.balance -= parseFloat(amount);
      goBack();
    }, 1500);
  };

  const handleBack = () => {
    if (step === "confirm") setStep("amount");
    else if (step === "amount") {
      if (preselected) goBack();
      else setStep("recipient");
    } else goBack();
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={handleBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Transfer Money</span>
      </div>

      {step === "recipient" && (
        <div className="glass-card responsive-card" style={{ borderRadius: "28px" }}>
          {/* Search Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              borderRadius: "18px",
              backgroundColor: c.secondary,
              marginBottom: "24px",
            }}
          >
            <Ionicons name="search" size={18} color={c.mutedForeground} />
            <input
              placeholder="Email, username, or name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, fontSize: "15px", color: c.foreground, width: "100%" }}
            />
          </div>

          {/* Send as link */}
          <div
            onClick={() => {
              setSelectedContact({ id: "link", name: "Claimable Link", username: "Anyone with the link", avatar: "" });
              setStep("amount");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 20px",
              borderRadius: "20px",
              backgroundColor: `${c.primary}0D`,
              border: `1px solid ${c.primary}20`,
              marginBottom: "24px",
              cursor: "pointer",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "16px", backgroundColor: `${c.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="link" size={20} color={c.primary} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>Send as Link</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>Anyone can claim it</div>
            </div>
          </div>

          <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
            CONTACTS
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filtered.map((co) => (
              <div
                key={co.id}
                onClick={() => { setSelectedContact(co); setStep("amount"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "12px 14px",
                  borderRadius: "18px",
                  cursor: "pointer",
                }}
                className="tx-item-hover"
              >
                <img src={co.avatar} alt={co.name} style={{ width: "48px", height: "48px", borderRadius: "16px", objectFit: "cover" }} />
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{co.name}</div>
                  <div style={{ fontSize: "13px", color: c.mutedForeground }}>{co.username}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "amount" && selectedContact && (
        <div className="glass-card responsive-card" style={{ borderRadius: "28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {selectedContact.id === "link" ? (
            <div style={{ width: "72px", height: "72px", borderRadius: "24px", backgroundColor: `${c.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <Ionicons name="link" size={30} color={c.primary} />
            </div>
          ) : (
            <img src={selectedContact.avatar} alt={selectedContact.name} style={{ width: "72px", height: "72px", borderRadius: "24px", objectFit: "cover", marginBottom: "12px" }} />
          )}
          <div style={{ fontSize: "18px", fontWeight: "700", color: c.foreground }}>{selectedContact.name}</div>
          <div style={{ fontSize: "13px", color: c.mutedForeground, marginBottom: "28px" }}>{selectedContact.username}</div>

          <div style={{ fontSize: "52px", fontWeight: "800", letterSpacing: "-2px", color: c.foreground, marginBottom: "8px", fontFamily: fonts.display }}>
            ${amount || "0"}
          </div>
          <div style={{ fontSize: "13px", color: c.mutedForeground, marginBottom: "24px" }}>
            {selectedContact.id === "link" ? "Via claimable link" : "Sent via digital USD"}
          </div>

          <input
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: "70%", textAlign: "center", padding: "10px 0", borderBottom: `2px solid ${c.border}`, fontSize: "15px", color: c.foreground, marginBottom: "32px" }}
          />

          {/* Keypad */}
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
            onClick={() => setStep("confirm")}
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
            Continue
          </button>
        </div>
      )}

      {step === "confirm" && selectedContact && (
        <div className="glass-card responsive-card" style={{ borderRadius: "28px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {sending ? (
            <div style={{ textAlign: "center", padding: "40px 0" }} className="fade-in">
              <div style={{ width: "88px", height: "88px", borderRadius: "50%", backgroundColor: c.success, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto", boxShadow: "0 10px 24px rgba(46, 158, 106, 0.25)" }}>
                <Ionicons name="checkmark" size={36} color="#fff" />
              </div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, marginBottom: "8px" }}>Money Sent Successfully!</div>
              <div style={{ fontSize: "16px", color: c.mutedForeground }}>
                ${parseFloat(amount).toFixed(2)} to {selectedContact.name}
              </div>
            </div>
          ) : (
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }} className="fade-in">
              {selectedContact.id === "link" ? (
                <div style={{ width: "72px", height: "72px", borderRadius: "24px", backgroundColor: `${c.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Ionicons name="link" size={30} color={c.primary} />
                </div>
              ) : (
                <img src={selectedContact.avatar} alt={selectedContact.name} style={{ width: "72px", height: "72px", borderRadius: "24px", objectFit: "cover", marginBottom: "12px" }} />
              )}
              <div style={{ fontSize: "18px", fontWeight: "700", color: c.foreground }}>{selectedContact.name}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground, marginBottom: "32px" }}>{selectedContact.username}</div>

              <div style={{ width: "100%", borderRadius: "24px", backgroundColor: c.secondary, padding: "24px", display: "flex", flexDirection: "column", gap: "18px", marginBottom: "32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", color: c.mutedForeground }}>Amount</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", color: c.mutedForeground }}>Network Fee</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: c.success }}>$0.00 (Sponsored)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "15px", color: c.mutedForeground }}>Arrival</span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>Instant</span>
                </div>
                {note && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "15px", color: c.mutedForeground }}>Note</span>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{note}</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleSend}
                style={{
                  width: "100%",
                  padding: "18px",
                  borderRadius: "20px",
                  background: `linear-gradient(135deg, ${c.gradientAccent[0]}, ${c.gradientAccent[1]})`,
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "16px",
                  boxShadow: "0 10px 20px rgba(26, 158, 122, 0.15)",
                }}
              >
                Send Money
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ActivityScreen = ({ txs }: { txs: Transaction[] }) => {
  const { c } = useTheme();
  const { navigate, goBack } = useAppNavigation();

  return (
    <div className="fade-in">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Activity Ledger</span>
      </div>

      <div className="glass-card" style={{ borderRadius: "28px", padding: "12px" }}>
        {txs.map((tx) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onClick={() => navigate("TransactionDetail", { id: tx.id })}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileScreen = () => {
  const { c, theme, setTheme } = useTheme();
  const { goBack } = useAppNavigation();

  const menuItems = [
    { icon: "shield-checkmark-outline", label: "Security", desc: "Biometrics & PIN" },
    { icon: "business-outline", label: "Linked Banks", desc: "Manage accounts" },
    { icon: "globe-outline", label: "Currency", desc: "USD" },
    { icon: "notifications-outline", label: "Notifications", desc: "Push & email" },
    { icon: "key-outline", label: "Recovery", desc: "Backup options" },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "680px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Settings Profile</span>
      </div>

      {/* Avatar details */}
      <div className="glass-card responsive-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "28px", marginBottom: "24px" }}>
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <img src={initialUser.avatar} alt="Victor" style={{ width: "96px", height: "96px", borderRadius: "28px", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: "-4px", right: "-4px", width: "26px", height: "26px", borderRadius: "50%", backgroundColor: c.success, border: `3.5px solid ${c.card}` }} />
        </div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: c.foreground }}>{initialUser.name}</div>
        <div style={{ fontSize: "15px", fontWeight: "700", color: c.primary, margin: "4px 0" }}>{initialUser.username}</div>
        <div style={{ fontSize: "13px", color: c.mutedForeground }}>{initialUser.email}</div>

        {/* QR Code link actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "48px", width: "100%", marginTop: "28px", paddingTop: "24px", borderTop: `1px solid ${c.border}50` }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="qr-code-outline" size={22} color={c.primary} />
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: c.foreground }}>My QR Code</span>
          </div>
          <div style={{ width: "1px", height: "48px", backgroundColor: c.border }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="share-outline" size={22} color={c.primary} />
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: c.foreground }}>Share Code</span>
          </div>
        </div>
      </div>

      {/* Toggle dark theme */}
      <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px 24px", borderRadius: "24px", marginBottom: "24px" }}>
        <div style={{ width: "44px", height: "44px", borderRadius: "16px", backgroundColor: c.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={theme === "dark" ? "moon-outline" : "sunny-outline"} size={20} color={c.primary} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>Dark Mode Theme</div>
          <div style={{ fontSize: "13px", color: c.mutedForeground }}>Toggle light and dark color scheme</div>
        </div>
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            width: "52px",
            height: "28px",
            borderRadius: "14px",
            backgroundColor: theme === "dark" ? c.primary : c.secondary,
            position: "relative",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: theme === "dark" ? "27px" : "3px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
              transition: "left 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>

      {/* Security lists */}
      <div className="glass-card" style={{ borderRadius: "28px", overflow: "hidden" }}>
        {menuItems.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "18px 24px",
              borderBottom: i < menuItems.length - 1 ? `1px solid ${c.border}40` : "none",
              cursor: "pointer",
            }}
            className="tx-item-hover"
          >
            <div style={{ width: "44px", height: "44px", borderRadius: "16px", backgroundColor: c.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={item.icon} size={20} color={c.foreground} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{item.label}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>{item.desc}</div>
            </div>
            <Ionicons name="chevron-forward" size={18} color={c.mutedForeground} />
          </div>
        ))}
      </div>
    </div>
  );
};

const DepositScreen = ({ onAddMoney }: { onAddMoney: (amt: number) => void }) => {
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

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Add Money</span>
      </div>

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
    </div>
  );
};

const WithdrawScreen = () => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();

  const banks = [
    { id: "1", name: "Chase Bank", last4: "4821" },
    { id: "2", name: "Bank of America", last4: "7392" },
  ];

  const [selected, setSelected] = useState(banks[0].id);
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    const val = parseFloat(amount);
    if (val > initialUser.balance) {
      alert("Error: Insufficient balance!");
      return;
    }
    initialUser.balance -= val;
    alert(`Success! Withdrew $${val.toFixed(2)} to Chase Bank.`);
    goBack();
  };

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Withdraw Money</span>
      </div>

      <div className="glass-card responsive-card" style={{ borderRadius: "28px" }}>
        <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
          SELECT BANK ACCOUNT
        </div>

        {banks.map((bank) => (
          <div
            key={bank.id}
            onClick={() => setSelected(bank.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "18px 20px",
              borderRadius: "20px",
              border: `1.5px solid ${selected === bank.id ? c.primary : `${c.border}50`}`,
              backgroundColor: selected === bank.id ? `${c.primary}08` : "transparent",
              marginBottom: "12px",
              cursor: "pointer",
            }}
          >
            <div style={{ width: "48px", height: "48px", borderRadius: "16px", backgroundColor: selected === bank.id ? `${c.primary}1A` : c.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="business-outline" size={22} color={selected === bank.id ? c.primary : c.foreground} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{bank.name}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>Checking account ••••{bank.last4}</div>
            </div>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: `2px solid ${selected === bank.id ? c.primary : c.mutedForeground}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selected === bank.id && (
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c.primary }} />
              )}
            </div>
          </div>
        ))}

        <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginTop: "32px", marginBottom: "16px" }}>
          AMOUNT TO WITHDRAW
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "18px 24px", borderRadius: "20px", backgroundColor: c.secondary, marginBottom: "32px" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", color: c.foreground, marginRight: "8px" }}>$</span>
          <input
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ flex: 1, fontSize: "22px", fontWeight: "700", color: c.foreground, width: "100%" }}
          />
        </div>

        <button
          disabled={!amount || parseFloat(amount) === 0}
          onClick={handleWithdraw}
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
          Confirm Withdrawal
        </button>
      </div>
    </div>
  );
};

const SaveScreen = () => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();

  const saveOptions = [
    { icon: "wallet-outline", label: "Savings Goal", desc: "Set a target and auto-save", rate: "4.5% APY" },
    { icon: "shield-checkmark-outline", label: "Fixed Deposit", desc: "Lock funds for higher returns", rate: "6.2% APY" },
    { icon: "trending-up-outline", label: "Flex Save", desc: "Save and withdraw anytime", rate: "3.1% APY" },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Savings Growth Hub</span>
      </div>

      <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
        CHOOSE A HIGH-YIELD PLANS
      </div>

      {saveOptions.map((opt) => (
        <div
          key={opt.label}
          onClick={() => alert(`Subscribed to ${opt.label} at ${opt.rate} APY!`)}
          style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px 24px", borderRadius: "24px", backgroundColor: c.card, border: `1px solid ${c.border}50`, marginBottom: "16px", cursor: "pointer", boxShadow: shadows.card }}
          className="tx-item-hover"
        >
          <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={opt.icon} size={24} color={c.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: c.foreground }}>{opt.label}</div>
            <div style={{ fontSize: "13px", color: c.mutedForeground }}>{opt.desc}</div>
          </div>
          <div style={{ padding: "8px 16px", borderRadius: "14px", backgroundColor: `${c.primary}12`, fontSize: "13px", fontWeight: "700", color: c.primary }}>
            {opt.rate}
          </div>
        </div>
      ))}
    </div>
  );
};

const InvestScreen = () => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();

  const investOptions = [
    { icon: "bar-chart-outline", label: "Stocks & ETFs", desc: "Invest in global markets", tag: "Popular" },
    { icon: "logo-bitcoin", label: "Crypto Assets", desc: "Buy and hold digital assets", tag: "Volatile" },
    { icon: "leaf-outline", label: "Green Energy Funds", desc: "Sustainable & ESG portfolios", tag: "New Portfolio" },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: "700px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="chevron-back" size={24} color={c.foreground} />
        </button>
        <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Whales Investment Platform</span>
      </div>

      <div style={{ fontSize: "12px", fontWeight: "700", color: c.mutedForeground, letterSpacing: "1.5px", marginBottom: "16px" }}>
        CHOOSE AN ASSET CLASS
      </div>

      {investOptions.map((opt) => (
        <div
          key={opt.label}
          onClick={() => alert(`Subscribed to ${opt.label} green portfolio!`)}
          style={{ display: "flex", alignItems: "center", gap: "20px", padding: "20px 24px", borderRadius: "24px", backgroundColor: c.card, border: `1px solid ${c.border}50`, marginBottom: "16px", cursor: "pointer", boxShadow: shadows.card }}
          className="tx-item-hover"
        >
          <div style={{ width: "52px", height: "52px", borderRadius: "18px", backgroundColor: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={opt.icon} size={24} color={c.primary} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: "700", color: c.foreground }}>{opt.label}</div>
            <div style={{ fontSize: "13px", color: c.mutedForeground }}>{opt.desc}</div>
          </div>
          <div style={{ padding: "8px 16px", borderRadius: "14px", backgroundColor: `${c.primary}12`, fontSize: "13px", fontWeight: "700", color: c.primary }}>
            {opt.tag}
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionDetailScreen = ({ txs }: { txs: Transaction[] }) => {
  const { c } = useTheme();
  const { goBack, params } = useAppNavigation();
  const tx = txs.find((t) => t.id === params?.id);
  const [showTech, setShowTech] = useState(false);

  if (!tx) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", color: c.mutedForeground }}>
        Transaction not found
      </div>
    );
  }

  const isReceived = tx.type === "received";

  return (
    <div className="fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={24} color={c.foreground} />
          </button>
          <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Transaction Ledger Details</span>
        </div>
        <button
          onClick={() => alert("Copied details share link!")}
          style={{ width: "40px", height: "40px", borderRadius: "12px", border: `1px solid ${c.border}50`, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="share-outline" size={18} color={c.foreground} />
        </button>
      </div>

      <div className="glass-card responsive-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderRadius: "28px" }}>
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "26px",
            backgroundColor: `${isReceived ? c.success : c.primary}1A`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={36}
            color={isReceived ? c.success : c.primary}
            style={{ transform: `rotate(${isReceived ? "135deg" : "-45deg"})` }}
          />
        </div>

        <div style={{ fontSize: "40px", fontWeight: "800", letterSpacing: "-1.5px", color: isReceived ? c.success : c.foreground, marginBottom: "8px", fontFamily: fonts.display }}>
          {isReceived ? "+" : "−"}${tx.amount.toFixed(2)}
        </div>
        <div style={{ fontSize: "15px", color: c.mutedForeground, marginBottom: "32px" }}>
          {isReceived ? "Received from" : "Sent to"}{" "}
          <strong style={{ fontWeight: "700", color: c.foreground }}>{tx.name}</strong>
        </div>

        <div style={{ width: "100%", borderRadius: "24px", backgroundColor: c.secondary, padding: "24px", display: "flex", flexDirection: "column", gap: "18px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingBottom: "18px", borderBottom: `1px solid ${c.border}33` }}>
            <img src={tx.avatar} alt={tx.name} style={{ width: "48px", height: "48px", borderRadius: "16px", objectFit: "cover" }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.name}</div>
              <div style={{ fontSize: "13px", color: c.mutedForeground }}>{tx.username}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Status</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Ionicons
                name={tx.status === "completed" ? "checkmark-circle" : "time-outline"}
                size={16}
                color={tx.status === "completed" ? c.success : c.warning}
              />
              <span style={{ fontSize: "15px", fontWeight: "700", color: tx.status === "completed" ? c.success : c.warning, textTransform: "capitalize" }}>
                {tx.status}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Date</span>
            <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.date}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "15px", color: c.mutedForeground }}>Fee</span>
            <span style={{ fontSize: "15px", fontWeight: "700", color: c.success }}>$0.00 (Sponsored)</span>
          </div>

          {tx.note && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "15px", color: c.mutedForeground }}>Note</span>
              <span style={{ fontSize: "15px", fontWeight: "700", color: c.foreground }}>{tx.note}</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowTech(!showTech)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px", fontSize: "13px", color: c.mutedForeground }}
        >
          <span>Technical Ledger Blockchain Info</span>
          <Ionicons name={showTech ? "chevron-up" : "chevron-down"} size={14} color={c.mutedForeground} />
        </button>

        {showTech && (
          <div style={{ width: "100%", borderRadius: "18px", backgroundColor: c.secondary, padding: "20px", display: "flex", flexDirection: "column", gap: "10px", textAlign: "left", fontFamily: "monospace", fontSize: "12px", color: c.mutedForeground, marginTop: "12px", lineHeight: "1.4" }}>
            <div>Network: Stellar Mainnet</div>
            <div style={{ wordBreak: "break-all" }}>TX Hash: 32f7e53d5a452ef783b9f487cb1f2020777fa98c487</div>
            <div>Ledger: #2020777</div>
            <div>Fee: Sponsored (free)</div>
          </div>
        )}
      </div>
    </div>
  );
};

const NotificationsScreen = () => {
  const { c } = useTheme();
  const { goBack } = useAppNavigation();

  const [list, setList] = useState([
    { id: "n1", title: "Payment Received", desc: "Sarah sent you $50.00 for 'Dinner split 🍕'", time: "Just now", type: "payment", unread: true },
    { id: "n2", title: "Security Update", desc: "Biometrics PIN & Login enabled successfully from this device.", time: "2 hours ago", type: "security", unread: true },
    { id: "n3", title: "Yield Earned! 🚀", desc: "Your Fixed Deposit plan earned $12.40 this month at 6.2% APY.", time: "Yesterday", type: "payment", unread: false },
    { id: "n4", title: "Market Alert: XLM", desc: "Stellar Lumen (XLM) increased by +4.8% today. Check your Green Portfolio.", time: "2 days ago", type: "system", unread: false },
  ]);

  const markAllRead = () => {
    setList((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return { name: "arrow-down-circle-outline", color: c.success };
      case "security":
        return { name: "shield-checkmark-outline", color: c.primary };
      case "system":
        return { name: "trending-up-outline", color: c.primary };
      default:
        return { name: "notifications-outline", color: c.mutedForeground };
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: "720px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={goBack} style={{ padding: "8px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="chevron-back" size={24} color={c.foreground} />
          </button>
          <span style={{ fontSize: "22px", fontWeight: "800", color: c.foreground, fontFamily: fonts.display, letterSpacing: "-0.5px" }}>Notifications Hub</span>
        </div>
        {list.some((n) => n.unread) && (
          <button onClick={markAllRead} style={{ fontSize: "14px", fontWeight: "700", color: c.primary }}>
            Mark all read
          </button>
        )}
      </div>

      {list.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "100px 0" }}>
          <Ionicons name="notifications-off-outline" size={54} color={`${c.mutedForeground}40`} />
          <div style={{ fontSize: "18px", fontWeight: "700", color: c.foreground }}>All caught up!</div>
          <div style={{ fontSize: "14px", color: c.mutedForeground }}>No new notifications at this time.</div>
        </div>
      ) : (
        <div className="glass-card" style={{ borderRadius: "28px", overflow: "hidden" }}>
          {list.map((item, i) => {
            const icon = getIcon(item.type);
            return (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "20px 24px",
                  backgroundColor: item.unread ? `${c.primary}06` : "transparent",
                  borderBottom: i < list.length - 1 ? `1px solid ${c.border}33` : "none",
                }}
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "14px", backgroundColor: `${icon.color}12`, display: "flex", alignItems: "center", justifyContent: "center", alignSelf: "flex-start" }}>
                  <Ionicons name={icon.name} size={20} color={icon.color} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: item.unread ? "700" : "600", color: c.foreground }}>
                      {item.title}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {item.unread && <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: c.primary }} />}
                      <span style={{ fontSize: "12px", color: c.mutedForeground }}>{item.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: c.mutedForeground, lineHeight: "1.5" }}>{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// Main Responsive App Layout
// ==========================================

const AppSimulator = () => {
  const { c, theme, setTheme } = useTheme();
  const { currentScreen, activeTab, setActiveTab, navigate } = useAppNavigation();

  // Unified global transactions log
  const [txs, setTxs] = useState<Transaction[]>(initialTransactions);

  const handleAddTransaction = (newTx: Omit<Transaction, "id" | "date" | "status">) => {
    const formatted: Transaction = {
      ...newTx,
      id: `t_${Date.now()}`,
      date: "Just now",
      status: "completed",
    };
    setTxs((p) => [formatted, ...p]);
  };

  const handleAddMoney = (amt: number) => {
    const formatted: Transaction = {
      id: `t_${Date.now()}`,
      type: "received",
      name: "Stellar Deposit",
      username: "@stellar",
      avatar: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=200&h=200",
      amount: amt,
      note: "Deposited via Stellar Anchor Middleware",
      date: "Just now",
      status: "completed",
    };
    setTxs((p) => [formatted, ...p]);
  };

  // Render correct page
  const renderScreen = () => {
    let content;
    switch (currentScreen) {
      case "Tabs":
        if (activeTab === "Home") content = <HomeScreen txs={txs} />;
        else if (activeTab === "Send") content = <SendScreen onAddTransaction={handleAddTransaction} />;
        else if (activeTab === "Activity") content = <ActivityScreen txs={txs} />;
        else if (activeTab === "Profile") content = <ProfileScreen />;
        else content = <HomeScreen txs={txs} />;
        break;
      case "Deposit":
        content = <DepositScreen onAddMoney={handleAddMoney} />;
        break;
      case "Withdraw":
        content = <WithdrawScreen />;
        break;
      case "Save":
        content = <SaveScreen />;
        break;
      case "Invest":
        content = <InvestScreen />;
        break;
      case "TransactionDetail":
        content = <TransactionDetailScreen txs={txs} />;
        break;
      case "Notifications":
        content = <NotificationsScreen />;
        break;
      default:
        content = <HomeScreen txs={txs} />;
    }
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentScreen}-${currentScreen === "Tabs" ? activeTab : ""}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.22 }}
          style={{ width: "100%" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Sidebar item configuration for desktop
  const sidebarItems = [
    { id: "Home", icon: "home-outline", label: "Dashboard", action: () => { navigate("Tabs"); setActiveTab("Home"); } },
    { id: "Send", icon: "arrow-forward-outline", label: "Transfer Money", action: () => navigate("Send") },
    { id: "Activity", icon: "time-outline", label: "Activity Ledger", action: () => { navigate("Tabs"); setActiveTab("Activity"); } },
    { id: "Profile", icon: "person-outline", label: "Settings Profile", action: () => { navigate("Tabs"); setActiveTab("Profile"); } },
    { id: "Notifications", icon: "notifications-outline", label: "Notifications", action: () => navigate("Notifications") },
  ];

  return (
    <div className="app-container">
      {/* Responsive Sidebar for Desktop */}
      <aside className="app-sidebar">
        {/* Brand logo beside text */}
        <div className="sidebar-logo">
          <img src="/logo.png" alt="WOW Logo" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
          <span>WOW.</span>
        </div>

        {/* Sidebar menu */}
        <nav className="sidebar-menu">
          {sidebarItems.map((item) => {
            const isActive = currentScreen === "Tabs" 
              ? (activeTab === "Home" && item.id === "Home") || (activeTab === "Activity" && item.id === "Activity") || (activeTab === "Profile" && item.id === "Profile")
              : (currentScreen === item.id);
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="sidebar-item"
                style={{
                  color: isActive ? c.primary : c.foreground,
                  backgroundColor: isActive ? `${c.primary}12` : "transparent",
                }}
              >
                <Ionicons name={item.icon} size={20} color={isActive ? c.primary : c.foreground} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Sidebar theme toggler */}
        <div
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px",
            borderRadius: "16px",
            cursor: "pointer",
            backgroundColor: c.secondary,
            marginTop: "auto",
          }}
        >
          <Ionicons name={theme === "dark" ? "moon-outline" : "sunny-outline"} size={18} color={c.primary} />
          <span style={{ fontSize: "13px", fontWeight: "700", color: c.foreground }}>
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </span>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="app-content" style={{ backgroundColor: c.background }}>
        <div className="content-inner">
          {renderScreen()}
        </div>
      </main>

      {/* Floating bottom tabs bar simulator for Mobile viewports */}
      <div className="mobile-tab-bar">
        <div className="mobile-tab-item" onClick={() => { navigate("Tabs"); setActiveTab("Home"); }}>
          <Ionicons name={activeTab === "Home" && currentScreen === "Tabs" ? "home" : "home-outline"} size={22} color={activeTab === "Home" && currentScreen === "Tabs" ? c.primary : c.mutedForeground} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: activeTab === "Home" && currentScreen === "Tabs" ? c.primary : c.mutedForeground }}>Home</span>
        </div>
        <div className="mobile-tab-item" onClick={() => { navigate("Tabs"); setActiveTab("Send"); }}>
          <Ionicons name={activeTab === "Send" && currentScreen === "Tabs" ? "arrow-forward" : "arrow-forward-outline"} size={22} color={activeTab === "Send" && currentScreen === "Tabs" ? c.primary : c.mutedForeground} style={{ transform: "rotate(-45deg)" }} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: activeTab === "Send" && currentScreen === "Tabs" ? c.primary : c.mutedForeground }}>Send</span>
        </div>
        <div className="mobile-tab-item" onClick={() => { navigate("Tabs"); setActiveTab("Activity"); }}>
          <Ionicons name={activeTab === "Activity" && currentScreen === "Tabs" ? "time" : "time-outline"} size={22} color={activeTab === "Activity" && currentScreen === "Tabs" ? c.primary : c.mutedForeground} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: activeTab === "Activity" && currentScreen === "Tabs" ? c.primary : c.mutedForeground }}>Activity</span>
        </div>
        <div className="mobile-tab-item" onClick={() => { navigate("Tabs"); setActiveTab("Profile"); }}>
          <Ionicons name={activeTab === "Profile" && currentScreen === "Tabs" ? "person" : "person-outline"} size={22} color={activeTab === "Profile" && currentScreen === "Tabs" ? c.primary : c.mutedForeground} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: activeTab === "Profile" && currentScreen === "Tabs" ? c.primary : c.mutedForeground }}>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        {/* Glow elements in the background constrained to viewport bounds */}
        <div className="glow-wrapper">
          <div className="web-bg-glow" style={{ top: "10%", left: "20%" }} />
          <div className="web-bg-glow-2" style={{ bottom: "10%", right: "20%" }} />
        </div>
        
        <AppSimulator />
      </NavigationProvider>
    </ThemeProvider>
  );
}
