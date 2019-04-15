import React from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { BallIndicator } from "react-native-indicators";
import { FETCH_SEASONS } from "../query/SeasonList";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  deleteView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.appBackground,
    marginTop: 8,
    marginBottom: 2,
    padding: 10,
    shadowColor: Colors.borderBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: 80,
  },
  deleteText: {
    color: Colors.white,
    fontFamily: "MerriweatherSans-Bold",
  },
  loading: {
    width: 80,
  },
});

const DELETE_SEASON = gql`
  mutation($id: Int!) {
    delete_season(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

class DeleteSwipe extends React.Component {
  render() {
    const { trans, deletedId: id } = this.props;
    return (
      <Mutation
        mutation={DELETE_SEASON}
        variables={{
          id,
        }}
        update={cache => {
          const data = cache.readQuery({
            query: FETCH_SEASONS,
          });
          const nextData = {
            ...data,
          };
          nextData.season = data.season.filter(
            ({ id: dataId }) => dataId !== id,
          );
          cache.writeQuery({
            query: FETCH_SEASONS,
            data: nextData,
          });
        }}
      >
        {(deleteSeason, { loading, error }) => {
          const submit = async () => {
            await deleteSeason();
          };

          if (error) {
            // TODO: add error handling
            console.log(error);
          }

          return (
            <TouchableOpacity style={styles.deleteView} onPress={submit}>
              {loading ? (
                <BallIndicator
                  style={styles.loading}
                  size={20}
                  color={Colors.white}
                />
              ) : (
                <Animated.Text
                  style={[
                    styles.deleteText,
                    {
                      transform: [{ translateX: trans }],
                    },
                  ]}
                >
                  Delete
                </Animated.Text>
              )}
            </TouchableOpacity>
          );
        }}
      </Mutation>
    );
  }
}

export default DeleteSwipe;
