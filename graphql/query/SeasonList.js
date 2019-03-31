import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import FixedButton from "../../components/FixedButton";

export const FETCH_SEASONS = gql`
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
    justifyContent: "center",
  },
});

export default class SeasonList extends React.Component {
  render() {
    return (
      <Query query={FETCH_SEASONS}>
        {({ data, error, loading }) => {
          if (error || loading) {
            return <Loading />;
          }
          return (
            <View style={styles.container}>
              <ScrollView
                style={styles.scrollView}
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
              <FixedButton text="New Season" />
            </View>
          );
        }}
      </Query>
    );
  }
}
