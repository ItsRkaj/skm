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
import { putLeaderboard } from '@/modules/apiClient';
import { useToast } from '@/hooks/use-toast';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  isDisabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  isDisabled,
}) => (
  <div className="flex flex-row items-center gap-2">
    <CardDescription>{label}: </CardDescription>
    <Input
      type={!isDisabled ? 'number' : 'text'}
      disabled={isDisabled}
      value={value}
      onChange={(e) => {
        const newValue = Number(e.target.value);
        if (newValue >= 0) {
          onChange(newValue);
        }
      }}
      className={isDisabled ? 'w-14' : 'w-20'}
    />
  </div>
);

interface PersonalBannerProps {
  leaderboard: LeaderboardEntry[];
  updateLeaderboard: () => Promise<void>;
}

const PersonalBanner: React.FC<PersonalBannerProps> = ({
  leaderboard,
  updateLeaderboard,
}) => {
  const { user } = useUser();
  const { toast } = useToast();

  const personalData = leaderboard.find(
    (entry) => entry.person.id === user?.id,
  );

  const [sewnPatches, setSewnPatches] = useState<number>(
    personalData?.sewn_patches ?? 0,
  );
  const [notSewnPatches, setNotSewnPatches] = useState<number>(
    personalData?.not_sewn_patches ?? 0,
  );
  const [medals, setMedals] = useState<number>(personalData?.medals ?? 0);
  const [pins, setPins] = useState<number>(personalData?.pins ?? 0);
  const [loading, setLoading] = useState(false);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [originalValues, setOriginalValues] = useState({
    sewn_patches: personalData?.sewn_patches ?? 0,
    not_sewn_patches: personalData?.not_sewn_patches ?? 0,
    medals: personalData?.medals ?? 0,
    pins: personalData?.pins ?? 0,
  });

  useEffect(() => {
    const hasChanged =
      sewnPatches !== originalValues.sewn_patches ||
      notSewnPatches !== originalValues.not_sewn_patches ||
      medals !== originalValues.medals ||
      pins !== originalValues.pins;

    setFieldsChanged(hasChanged);
  }, [sewnPatches, notSewnPatches, medals, pins, originalValues]);

  if (!personalData || !user) {
    return null;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const success = await putLeaderboard(
        /* eslint-disable-next-line */
        user.id!,
        sewnPatches,
        notSewnPatches,
        medals,
        pins,
      );
      if (success) {
        toast({
          description: 'Poäng uppdaterad!',
        });
      } else {
        toast({
          description: 'Något gick fel.',
        });
      }
      setOriginalValues({
        sewn_patches: sewnPatches,
        not_sewn_patches: notSewnPatches,
        medals: medals,
        pins: pins,
      });
      setFieldsChanged(false);
      await updateLeaderboard();
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-row items-center justify-between overflow-auto mb-12">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          {!isAvatarLoaded && (
            <Skeleton className="w-[100px] h-[100px] rounded-full bg-white" />
          )}
          <AvatarImage
            src={personalData.person.avatar}
            onLoad={() => setIsAvatarLoaded(true)}
            className={`${isAvatarLoaded ? 'block' : 'hidden'}`}
          />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{personalData.person.name}</CardTitle>
          <CardDescription>{personalData.person.nickname}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-row pt-6 gap-4">
        <InputField
          label="Märken"
          value={sewnPatches + notSewnPatches}
          onChange={() => {}}
          isDisabled
        />
        <InputField
          label="Sydda märken"
          value={sewnPatches}
          onChange={setSewnPatches}
        />
        <InputField
          label="Osydda märken"
          value={notSewnPatches}
          onChange={setNotSewnPatches}
        />
        <InputField label="Medaljer" value={medals} onChange={setMedals} />
        <InputField label="Pins" value={pins} onChange={setPins} />
      </CardContent>

      <CardFooter className="pt-6">
        {/* eslint-disable-next-line */}
        <Button disabled={!fieldsChanged || loading} onClick={handleSave}>
          {loading ? 'Sparar...' : 'Spara'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalBanner;
