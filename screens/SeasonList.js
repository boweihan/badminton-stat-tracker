import React from "react";
import { FlatList, View, Text, ScrollView, StyleSheet } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const FETCH_SEASONS = gql`
  query {
    season {
      id
      name
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default class SeasonList extends React.Component {
  render() {
    return (
      <Query query={FETCH_SEASONS}>
        {({ data, error, loading }) => {
          if (error || loading) {
            return (
              <View>
                <Text> Loading ... </Text>
              </View>
            );
          }
          return (
            <ScrollView
              style={styles.container}
              contentContainerStyle={styles.container}
            >
              <FlatList
                data={data.season}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id.toString()}
              />
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
