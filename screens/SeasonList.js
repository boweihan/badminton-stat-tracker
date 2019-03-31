import React from "react";
import { FlatList, View, ScrollView, StyleSheet } from "react-native";
import { BarIndicator } from "react-native-indicators";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "../components/Card";

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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
              <View style={styles.loadingContainer}>
                <BarIndicator
                  color="black"
                  count={5}
                  size={60}
                  style={{ flex: 0 }}
                />
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
                renderItem={({ item }) => (
                  <Card title={item.name} subtitle={item.description} />
                )}
                keyExtractor={item => item.id.toString()}
              />
            </ScrollView>
          );
        }}
      </Query>
    );
  }
}
