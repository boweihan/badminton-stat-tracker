import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FETCH_SEASONS } from "../query/SeasonList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

const INSERT_SEASON = gql`
  mutation($text: String!, $userId: String!) {
    insert_season(objects: [{ name: $name }]) {
      returning {
        id
        name
      }
    }
  }
`;

export default class AddSeason extends React.Component {
  state = {
    name: "",
  };

  _handleNameChange = name => {
    this.setState({
      name,
    });
  };

  render() {
    const { name } = this.state;
    return (
      <Mutation
        mutation={INSERT_SEASON}
        variables={{
          name,
        }}
        update={(cache, { data: { insert_season } }) => {
          const data = cache.readQuery({
            query: FETCH_SEASONS,
          });
          const newSeason = insert_season.returning[0];
          const newData = {
            seasons: [newSeason, ...data.seasons],
          };
          cache.writeQuery({
            query: FETCH_SEASONS,
            data: newData,
          });
        }}
      >
        {(insertSeason, { loading, error }) => {
          const submit = () => {
            if (error) {
              return <Text> Error </Text>;
            }
            if (loading || name === "") {
              return null;
            }
            this.setState({
              name: "",
            });
            insertSeason();
            return null;
          };
          return (
            <View style={styles.inputContainer}>
              <View style={styles.textboxContainer}>
                <TextInput
                  style={styles.textbox}
                  editable
                  onChangeText={this.handleTextChange}
                  value={name}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={submit}
                  disabled={name === ""}
                >
                  <Text style={styles.buttonText}> Add </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}
