import {
  StyleSheet,
  Modal,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { palette } from "../../theme/colors";

export type AppDialogAction = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "destructive";
};

export type AppDialogConfig = {
  title: string;
  message: string;
  actions: AppDialogAction[];
};

export function AppDialog({
  dialog,
  onClose,
}: {
  dialog: AppDialogConfig | null;
  onClose: () => void;
}) {
  const { width } = useWindowDimensions();

  return (
    <Modal
      visible={dialog !== null}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
          onPress={onClose}
          style={styles.dismissBackdrop}
        />
        {dialog ? (
          <View
            style={[styles.modalCard, { width: Math.min(width - 40, 390) }]}
          >
            <View style={[styles.dialogHeader]}>
              <View style={styles.dialogCopy}>
                <Text accessibilityRole="header" style={styles.dialogTitle}>
                  {dialog.title}
                </Text>
                <Text style={styles.dialogMessage}>{dialog.message}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close dialog"
                onPress={onClose}
                hitSlop={8}
                style={styles.closeButton}
              />
            </View>
            <View style={styles.actionList}>
              {dialog.actions.map((action) => {
                const primary = action.variant === "primary";
                const destructive = action.variant === "destructive";
                return (
                  <Pressable
                    key={action.label}
                    accessibilityRole="button"
                    onPress={() => {
                      onClose();
                      action.onPress?.();
                    }}
                    style={({ pressed }) => [
                      styles.actionButton,
                      {
                        backgroundColor: primary
                          ? palette.green
                          : palette.white,
                        borderWidth: primary ? 0 : 1,
                        opacity: pressed ? 0.8 : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.actionLabel,
                        {
                          color: primary
                            ? palette.white
                            : destructive
                              ? palette.red
                              : palette.ink,
                        },
                      ]}
                    >
                      {action.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#111A16A8",
  },
  dismissBackdrop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  dialogHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  dialogCopy: { flex: 1 },
  dialogTitle: { color: palette.ink, fontSize: 19, fontWeight: "800" },
  dialogMessage: {
    color: palette.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: palette.canvas,
    alignItems: "center",
    justifyContent: "center",
  },
  actionList: { gap: 9, marginTop: 20 },
  modalCard: {
    backgroundColor: palette.white,
    borderRadius: 22,
    padding: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  actionButton: {
    minHeight: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderColor: palette.line,
  },
  actionLabel: { fontSize: 13, fontWeight: "700" },
});
