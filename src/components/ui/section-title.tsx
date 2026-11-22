import { StyleSheet, Text, View } from 'react-native';

import { palette } from '../../theme/colors';

export function SectionTitle({
    title,
    action,
    onAction
}: {
    title: string;
    action?: string;
    onAction?: () => void;
}){
    return (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {action ? (<Text onPress={onAction} style={styles.sectionAction}>{action}</Text>) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    sectionTitle: {
        color: palette.ink,
        fontSize: 19,
        fontWeight: "700",
    },
    sectionAction: {
        color: palette.green,
        fontSize: 13,
        fontWeight: "700",
        padding: 4,
    }
});