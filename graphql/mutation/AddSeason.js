import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
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
  mutation($name: String!, $description: String) {
    insert_season(objects: [{ name: $name, description: $description }]) {
      returning {
        id
        name
        description
      }
    }
  }
`;

class AddSeason extends React.Component {
  navigationOptions = {
    title: "Add Season",
  };

  state = {
    name: "",
  };

  handleNameChange = name => {
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
            season: [newSeason, ...data.season],
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
            insertSeason({ variables: { name } });
            this.setState({
              name: "",
            });
            return null;
          };
          return (
            <View style={styles.container}>
              <Input
                placeholder="Season Name"
                leftIcon={<Icon name="rowing" />}
                onChangeText={this.handleNameChange}
              />
              <Button title="Add Season" onPress={submit} />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default AddSeason;
