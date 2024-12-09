import React from "react";
import { StyleSheet, Text, View } from "react-native";

import VerticalSpace from "../../VerticalSpace";
import HorizontalLine from "../../HorizontalLine";
import TextButton from "../../Button/TextButton";

import { THEME, WHITE, WHITE_SMOKE } from "../../../constants/colors";
import { hR, sR, width, wR } from "../../../constants/dimensions";
import {
  PROXIMA_NOVA_BOLD,
  PROXIMA_NOVA_REGULAR,
  PROXIMA_NOVA_SEMIBOLD,
} from "../../../constants/fonts";
import useToggle from "../../../hooks/useToggle";

const ExpandableText = ({
  text,
  numberOfLinesCollapsed,
  numberOfLinesExpanded,
  isExpanded,
  toggleExpanded,
  style,
}: {
  text: string;
  numberOfLinesCollapsed: number;
  numberOfLinesExpanded: number;
  isExpanded: boolean;
  toggleExpanded: () => void;
  style?: object;
}) => {
  return (
    <>
      <Text
        style={style}
        numberOfLines={
          isExpanded ? numberOfLinesExpanded : numberOfLinesCollapsed
        }
      >
        {text}
      </Text>
      <TextButton
        label={isExpanded ? "See Less" : "See More"}
        onPress={toggleExpanded}
      />
    </>
  );
};

const ComplaintCard: React.FC = () => {
  const [complaintMessageExpanded, toggleComplaintMessageExpanded] =
    useToggle(false);
  const [complaintReplyExpanded, toggleComplaintReplyExpanded] =
    useToggle(false);

  return (
    <View style={styles.rootContainer}>
      {/* Top Section */}
      <View style={styles.topContainer}>
        <Text style={styles.complaintIdText}>Complaint #sa-32</Text>
        
        <View style={styles.complaintStatusContainer}>
          <Text style={styles.complaintStatusText}>In-Progress</Text>
        </View>
      </View>

      <VerticalSpace h={2} />

      {/* Complaint Message */}
      <ExpandableText
        text="WARN (ADVICE) View #3047 of type RCTView has a shadow set but cannot calculate shadow efficiently. Consider setting a solid background color to fix this, or apply the shadow to a more specific component."
        numberOfLinesCollapsed={2}
        numberOfLinesExpanded={0}
        isExpanded={complaintMessageExpanded}
        toggleExpanded={toggleComplaintMessageExpanded}
        style={styles.complaintMessageText}
      />

      <VerticalSpace h={2} />

      <HorizontalLine />
      
      <VerticalSpace h={2} />

      {/* Complaint Reply */}
      <ExpandableText
        text={
          <>
            <Text style={styles.replyPrefix}>RE: </Text>
            WARN (ADVICE) View #3047 of type RCTView has a shadow set but cannot
            calculate shadow efficiently. Consider setting a solid background
            color to fix this, or apply the shadow to a more specific component.
          </>
        }
        numberOfLinesCollapsed={1}
        numberOfLinesExpanded={0}
        isExpanded={complaintReplyExpanded}
        toggleExpanded={toggleComplaintReplyExpanded}
        style={styles.complaintReplyText}
      />
    </View>
  );
};

export default ComplaintCard;

const styles = StyleSheet.create({
  rootContainer: {
    paddingHorizontal: wR * 4,
    paddingVertical: hR * 2,
    borderRadius: sR,
    width: wR * 92,
    marginBottom: hR * 2,
    backgroundColor: WHITE_SMOKE,
    alignSelf: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  complaintIdText: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
    fontSize: sR * 1.3,
  },
  complaintStatusContainer: {
    backgroundColor: THEME,
    paddingVertical: hR * 0.6,
    paddingHorizontal: wR * 4,
    borderRadius: width,
  },
  complaintStatusText: {
    fontFamily: PROXIMA_NOVA_BOLD,
    color: WHITE,
    fontSize: sR,
  },
  complaintMessageText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR,
  },
  complaintReplyText: {
    fontFamily: PROXIMA_NOVA_REGULAR,
    fontSize: sR,
  },
  replyPrefix: {
    fontFamily: PROXIMA_NOVA_SEMIBOLD,
  },
});
