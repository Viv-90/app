import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { useWallet } from "../WalletContext";
import { LinearGradient } from "expo-linear-gradient";
import { shadows } from "../theme";

const saveOptions = [
  { icon: "wallet-outline" as const, label: "Savings Goal", desc: "Set a target and auto-save", rate: "4.5% APY", apy: 0.045 },
  { icon: "shield-checkmark-outline" as const, label: "Fixed Deposit", desc: "Lock funds for higher returns", rate: "6.2% APY", apy: 0.062 },
  { icon: "trending-up-outline" as const, label: "Flex Save", desc: "Save and withdraw anytime", rate: "3.1% APY", apy: 0.031 },
];

const SaveScreen = ({ navigation }: any) => {
  const { c } = useTheme();
  const { balance } = useWallet();
  const [selectedPlan, setSelectedPlan] = useState<typeof saveOptions[0] | null>(null);
  const [calcAmount, setCalcAmount] = useState("1000");

  const projectedValue = (parseFloat(calcAmount) || 0) * (1 + (selectedPlan?.apy || 0));

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    const amt = parseFloat(calcAmount);
    if (isNaN(amt) || amt <= 0) return;
    if (amt > balance) {
      Alert.alert("Insufficient Balance", "You don't have enough available balance to allocate to this savings plan.");
      return;
    }
    Alert.alert(
      "Savings Plan Activated",
      `Successfully allocated $${amt.toFixed(2)} to ${selectedPlan.label} at ${selectedPlan.rate}.`
    );
    setSelectedPlan(null);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => selectedPlan ? setSelectedPlan(null) : navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>
            {selectedPlan ? selectedPlan.label : "Savings Growth Hub"}
          </Text>
        </View>

        {selectedPlan ? (
          <View style={[styles.calculatorCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
            <Text style={[styles.calcTitle, { color: c.foreground }]}>Yield Projection Calculator</Text>
            <Text style={[styles.calcDesc, { color: c.mutedForeground }]}>
              Enter an amount to see how much your savings will grow in 1 year at {selectedPlan.rate}.
            </Text>

            <Text style={[styles.labelInputTitle, { color: c.mutedForeground }]}>PRINCIPAL AMOUNT</Text>
            <View style={[styles.amountInputWrap, { backgroundColor: c.secondary }]}>
              <Text style={[styles.dollarSign, { color: c.foreground }]}>$</Text>
              <TextInput
                value={calcAmount}
                onChangeText={setCalcAmount}
                keyboardType="numeric"
                style={[styles.textInput, { color: c.foreground }]}
              />
            </View>

            <View style={styles.projectionWrap}>
              <View style={styles.projectionRow}>
                <Text style={[styles.projLabel, { color: c.mutedForeground }]}>Interest Earned:</Text>
                <Text style={[styles.projVal, { color: c.success }]}>
                  +${((parseFloat(calcAmount) || 0) * (selectedPlan.apy)).toFixed(2)}
                </Text>
              </View>
              <View style={[styles.divider, { backgroundColor: c.border + "33" }]} />
              <View style={styles.projectionRow}>
                <Text style={[styles.projLabel, { color: c.foreground, fontWeight: "700" }]}>Total Value (1 Yr):</Text>
                <Text style={[styles.projVal, { color: c.foreground, fontWeight: "800" }]}>
                  ${projectedValue.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleSubscribe} activeOpacity={0.8} style={{ marginTop: 24 }}>
              <LinearGradient
                colors={c.gradientAccent as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subscribeBtn}
              >
                <Text style={styles.subscribeText}>Activate Plan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>CHOOSE A SAVINGS PLAN</Text>
            {saveOptions.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                activeOpacity={0.7}
                onPress={() => setSelectedPlan(opt)}
                style={[styles.card, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}
              >
                <View style={[styles.icon, { backgroundColor: c.primary + "1A" }]}>
                  <Ionicons name={opt.icon} size={20} color={c.primary} />
                </View>
                <View style={styles.info}>
                  <Text style={[styles.label, { color: c.foreground }]}>{opt.label}</Text>
                  <Text style={[styles.desc, { color: c.mutedForeground }]}>{opt.desc}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: c.primary + "1A" }]}>
                  <Text style={[styles.badgeText, { color: c.primary }]}>{opt.rate}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 20 },
  backBtn: { padding: 8, borderRadius: 16 },
  title: { fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 16 },
  card: {
    flexDirection: "row", alignItems: "center", gap: 16, padding: 16, borderRadius: 16,
    borderWidth: 1, marginBottom: 12,
  },
  icon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600" },
  desc: { fontSize: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  calculatorCard: { borderRadius: 24, padding: 20, borderWidth: 1 },
  calcTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  calcDesc: { fontSize: 13, marginBottom: 24, lineHeight: 18 },
  labelInputTitle: { fontSize: 10, fontWeight: "700", letterSpacing: 1.5, marginBottom: 8 },
  amountInputWrap: { flexDirection: "row", alignItems: "center", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12 },
  dollarSign: { fontSize: 18, fontWeight: "700", marginRight: 4 },
  textInput: { flex: 1, fontSize: 18, fontWeight: "700" },
  projectionWrap: { marginTop: 24, gap: 12 },
  projectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  projLabel: { fontSize: 14 },
  projVal: { fontSize: 16, fontWeight: "700" },
  divider: { height: 1, width: "100%" },
  subscribeBtn: { paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  subscribeText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});

export default SaveScreen;
