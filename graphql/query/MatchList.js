import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListItem from "../../components/ListItem";
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

class MatchList extends React.Component {
  navigationOptions = {
    title: "Seasons",
  };

  render() {
    const { navigation } = this.props;
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
                    <ListItem
                      title={item.name}
                      subtitle={item.description}
                      style={styles.cardStyles}
                      onPress={() => navigation.navigate("MatchList")}
                    />
                  )}
                  keyExtractor={item => item.id.toString()}
                />
              </ScrollView>
              <FixedButton
                text="New Season"
                onPress={() => navigation.navigate("AddSeason")}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}

export default MatchList;
