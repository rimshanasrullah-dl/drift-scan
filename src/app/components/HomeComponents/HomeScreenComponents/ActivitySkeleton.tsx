import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SkeletonContent from 'react-native-reanimated-skeleton';


export default function ParkingListSkeleton() {
  const isLoading = true; // Toggle this to test


  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, ]} // Dummy data for skeleton count
        keyExtractor={(item) => item.toString()}
        renderItem={() => (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <SkeletonContent
                containerStyle={styles.skeletonContainer}
                isLoading={isLoading}
                layout={[
                  // 1. TOP ROW: Contains Icon + Info + Status
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    children: [
                      // GROUP A: Icon and Name/ID Text
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        children: [
                          // Car Icon Circle
                          {
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 12,
                          },
                          // Name and ID Column
                          {
                            flexDirection: 'column',
                            children: [
                              { width: 100, height: 20, marginBottom: 6 }, // Name (John Doe)
                              { width: 130, height: 14 }, // ID (#ORD...)
                            ],
                          },
                        ],
                      },
                      // GROUP B: Status Badge and Date (Right Aligned)
                      {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        children: [
                          { width: 70, height: 24, borderRadius: 12, marginBottom: 6 }, // "Entered" Badge
                          { width: 110, height: 14 }, // Date Time
                        ],
                      },
                    ],
                  },

                  // 2. DIVIDER LINE
                  {
                    width: '100%',
                    height: 1,
                    marginBottom: 15,
                  },

                  // 3. BOTTOM BUTTON (Centered "Release Slot")
                  {
                    width: '60%', 
                    height: 35,
                    borderRadius: 22,
                    alignSelf: 'center',
                  },
                ]}
                animationType="shiver"
                duration={1500}
              >
                {/* Your actual UI components go here */}
                <View style={{ height: 140 }} />
              </SkeletonContent>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    overflow: 'hidden', // Ensures skeleton doesn't bleed out
  },
  skeletonContainer: {
    //  backgroundColor: 'red',
    padding: 10,
    flex: 1,

  },
});