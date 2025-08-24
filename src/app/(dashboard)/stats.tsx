import { Avatar } from '@ui/avatar';
import { ButtonBase, ButtonIcon, ButtonLabel } from '@ui/button';
import {
  CardBase,
  CardBody,
  CardContent,
  CardHeader,
  CardTitle,
} from '@ui/card';
import { Icon } from '@ui/icon';
import { PixelRatio, ScrollView, Text, View } from 'react-native';

export default function Stats() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full flex-row items-center gap-4 p-4">
        <Avatar size={PixelRatio.getPixelSizeForLayoutSize(30)} />
        <Text className="text-lg font-bold text-foreground">User</Text>
      </View>
      <ScrollView contentContainerClassName="pb-20">
        <View className="flex-1 items-center gap-4 py-4">
          <Text className="font-bold text-foreground">Información General</Text>
          <CardBase width={150} style={{ margin: 10 }}>
            <CardContent>
              <CardBody>
                {({ fill, size }) => (
                  <>
                    <View className="w-full flex-row justify-between">
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                          fontWeight: 'bold',
                        }}
                      >
                        Pacientes Registrados
                      </Text>
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                        }}
                      >
                        0
                      </Text>
                    </View>
                    <View className="w-full flex-row justify-between">
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                          fontWeight: 'bold',
                        }}
                      >
                        Ejercicios Realizados
                      </Text>
                      <Text
                        style={{
                          fontSize: size,
                          color: fill,
                        }}
                      >
                        0
                      </Text>
                    </View>
                  </>
                )}
              </CardBody>
            </CardContent>
          </CardBase>
          <Text className="font-bold text-foreground">Informe por Bateria</Text>
          {[...Array(5)].map((_, index) => (
            <CardBase hasShadow={false} key={index} width={150}>
              <CardHeader>
                <CardTitle>Bateria {index + 1}</CardTitle>
                <ButtonBase hasShadow={false} width="auto">
                  <ButtonIcon>
                    {(props) => <Icon.Download {...props} />}
                  </ButtonIcon>
                </ButtonBase>
              </CardHeader>
            </CardBase>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-0 right-0 z-30">
        <ButtonBase width={60} size="sm" style={{ margin: 20 }}>
          <ButtonLabel>Informe</ButtonLabel>
          <ButtonIcon>
            {({ fill, size }) => <Icon.Download fill={fill} size={size} />}
          </ButtonIcon>
        </ButtonBase>
      </View>
    </View>
  );
}
