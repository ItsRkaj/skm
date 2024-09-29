'use client';
import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/modules/apiTypes';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '../ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useUser } from '@/context/UserContext';

interface InputFieldProps {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  isDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  setValue,
  isDisabled,
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <CardDescription>{label}: </CardDescription>
      <Input
        type={!isDisabled ? 'number' : ''}
        disabled={isDisabled}
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          if (newValue >= 0) {
            setValue(newValue);
          }
        }}
        className={isDisabled ? 'w-14' : 'w-20'}
      />
    </div>
  );
};

interface PersonalBannerProps {
  leaderboard: LeaderboardEntry[];
}

const PersonalBanner: React.FC<PersonalBannerProps> = ({ leaderboard }) => {
  const { user, isLoggedIn } = useUser();

  console.log(user);
  console.log('log:', isLoggedIn);

  if (!user) {
    return null;
  }

  const personalData = leaderboard.find((entry) => entry.person.id === user.id);

  if (!personalData) {
    return null;
  }

  const [originalValues, setOriginalValues] = useState({
    sewn_patches: personalData?.sewn_patches,
    not_sewn_patches: personalData?.not_sewn_patches,
    medals: personalData?.medals,
    pins: personalData?.pins,
  });
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);
  const [sewnPatches, setSewnPatches] = useState(personalData.sewn_patches);
  const [notSewnPatches, setNotSewnPatches] = useState(
    personalData.not_sewn_patches,
  );
  const [patches, setPatches] = useState(
    personalData.sewn_patches + personalData.not_sewn_patches,
  );
  const [medals, setMedals] = useState(personalData.medals);
  const [pins, setPins] = useState(personalData.pins);

  useEffect(() => {
    setPatches(sewnPatches + notSewnPatches);
  }, [sewnPatches, notSewnPatches]);

  useEffect(() => {
    const hasChanged =
      originalValues.sewn_patches !== sewnPatches ||
      originalValues.not_sewn_patches !== notSewnPatches ||
      originalValues.medals !== medals ||
      originalValues.pins !== pins;

    setFieldsChanged(hasChanged);
  }, [sewnPatches, notSewnPatches, medals, pins, originalValues]);

  const handleSave = () => {
    setOriginalValues({
      sewn_patches: sewnPatches,
      not_sewn_patches: notSewnPatches,
      medals,
      pins,
    });
    setFieldsChanged(false);
  };

  return (
    <Card className="flex flex-row items-center justify-between overflow-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          {!isAvatarLoaded && (
            <Skeleton className="w-[100px] h-[100px] rounded-full bg-white" />
          )}
          <AvatarImage
            src="https://github.com/shadcn.png"
            onLoad={() => setIsAvatarLoaded(true)}
            className={`${isAvatarLoaded ? 'block' : 'hidden'}`}
          />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>John Smith</CardTitle>
          <CardDescription>El Cabron</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-row pt-6 gap-4">
        <InputField
          label="Märken"
          value={patches}
          setValue={setPatches}
          isDisabled
        />
        <InputField
          label="Sydda märken"
          value={sewnPatches}
          setValue={setSewnPatches}
        />
        <InputField
          label="Osydda märken"
          value={notSewnPatches}
          setValue={setNotSewnPatches}
        />
        <InputField label="Medaljer" value={medals} setValue={setMedals} />
        <InputField label="Pins" value={pins} setValue={setPins} />
      </CardContent>
      <CardFooter className="pt-6">
        <Button disabled={!fieldsChanged} onClick={handleSave}>
          Spara
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalBanner;
