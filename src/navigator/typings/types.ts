import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RouteKeys from '../RouteKeys';
import { TypedRouteParams } from '../RoutesParams';

type TRouteKeys = keyof typeof RouteKeys;

export type NavigationProps = StackNavigationProp<RouteParamsList>;

export type ScreenProps<T extends TRouteKeys> = {
  navigation: StackNavigationProp<RouteParamsList, T>;
  route: Route<Extract<T, string>, RouteParamsList[T]>;
};

type GenericRouteParamsList<RouteParams> = {
  [K in TRouteKeys]: K extends keyof RouteParams
    ? RouteParams[K]
    : { screen: RouteKeys } | undefined;
};

export type RouteParamsList = GenericRouteParamsList<TypedRouteParams>;
