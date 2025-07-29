import { RegisterStep4 } from '@components/auth/register/step4';
import { RegisterStep1 } from '@components/auth/register/step1';
import { RegisterStep2 } from '@components/auth/register/step2';
import { RegisterStep3 } from '@components/auth/register/step3';
import { Button } from '@ui/button';
import { useThemeStore } from '@ui/theme/theme.store';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { ColorValue, PixelRatio, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const steps = [RegisterStep1, RegisterStep2, RegisterStep3, RegisterStep4];

export default function Register() {
  const { step } = useLocalSearchParams();
  const { gradients } = useThemeStore();
  const navigation = useNavigation();
  const router = useRouter();

  // Ensure step is a valid number and within bounds
  const currentStep = useMemo(() => {
    const num = Number(step);
    return Number.isFinite(num) && num > 0 ? num : 1;
  }, [step]);
  const maxSteps = steps.length;
  const StepComponent = steps[currentStep - 1];

  useEffect(() => {
    const percent = Math.round((currentStep / maxSteps) * 100);
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => (
        <AnimatedCircularProgress
          size={PixelRatio.getPixelSizeForLayoutSize(20)}
          width={PixelRatio.getPixelSizeForLayoutSize(2)}
          fill={percent}
          tintColor={tintColor}
        >
          {() => (
            <Text style={{ color: tintColor }} className="text-sm">
              {percent}%
            </Text>
          )}
        </AnimatedCircularProgress>
      ),
    });
  }, [navigation, currentStep, maxSteps]);

  const handleNext = () => {
    if (currentStep < maxSteps) {
      router.push(`/register/${currentStep + 1}`);
    } else {
      router.push('/dashboard');
    }
  };

  function NotFound() {
    return (
      <View className="flex w-1/2 flex-col items-center gap-8">
        <Text className="text-center text-5xl text-foreground">
          Parece que no hay un paso {step} definido.
        </Text>
        <Button.Base color="error" onPress={router.dismiss}>
          <Button.Label center>Volver</Button.Label>
        </Button.Base>
      </View>
    );
  }

  const gradientColors: [ColorValue, ColorValue] =
    !StepComponent && gradients?.backgroundError
      ? gradients.backgroundError
      : ['transparent', 'transparent'];

  return (
    <LinearGradient
      colors={gradientColors}
      className="flex-1 items-center justify-center"
    >
      {StepComponent ? (
        <StepComponent nextHandler={handleNext} />
      ) : (
        <NotFound />
      )}
    </LinearGradient>
  );
}
