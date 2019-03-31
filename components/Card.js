import React from "react";
import { Card, Text, Button, Icon } from "react-native-elements";

const CustomCard = ({ title, subtitle }) => (
  <Card title={title} image={require("../assets/images/shuttlecock.png")}>
    <Text style={{ marginBottom: 10 }}>{subtitle}</Text>
    <Button
      icon={<Icon name="eye" type="font-awesome" color="#ffffff" />}
      backgroundColor="#03A9F4"
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
    />
  </Card>
);

export default CustomCard;
