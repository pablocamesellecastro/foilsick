'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui/button';
import { ArrowLeftIcon, StepBackIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function GoBackButton() {
  const router = useRouter();
  const t = useTranslations("PageCard.Buttons");
  return (
    <Button variant='ghost' className='font-normal flex text-sm' onClick={() => router.back()}>
      <ArrowLeftIcon />{t("GoBack")}
    </Button>
  );
}