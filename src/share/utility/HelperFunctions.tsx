import { Text } from "react-native";

// Helper function to identify the email and bold it
  export const renderTextWithBoldEmail = (text:string) => {
    if (!text) return null;
    
    const target = 'support@driftfoodapp.com';
    // Split the text based on the target email
    const parts = text.split(new RegExp(`(${target})`, 'g'));

    return parts.map((part, index) => (
      <Text
        key={index}
        style={part === target ? { fontWeight: 'bold', color: '#000', } : {}}
      >
        {part}
      </Text>
    ));
  };