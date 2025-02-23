import { Colors } from '@/constants';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarLayout}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title;
        const tabIcon = options?.tabBarIcon;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItemLayout}
          >
            <View style={styles.tabItemContent}>
              {tabIcon &&
                tabIcon({
                  focused: isFocused,
                  color: isFocused ? Colors.light.primary : Colors.light.secondary,
                  size: 22,
                })}
              <Text>{label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default memo(TabBar);

const styles = StyleSheet.create({
  tabBarLayout: {
    flexDirection: 'row',
    backgroundColor: Colors.light.white,
    minHeight: 60,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: '#3E3E3E',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  tabItemLayout: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 10,
  },
  tabItemContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    zIndex: 1000,
  },
});
