"use client";
import { Button } from '@/app/components/ui/button';
import { ExpandIcon, ShrinkIcon } from 'lucide-react';
import TooltipEasy from '@/app/components/ui/tooltipEasy';
import { useEffect, useState } from 'react';
import { SidebarMenuButton } from '../../ui/sidebar';
import { useTranslations } from 'next-intl';

export default function SwitchFullScreen({...props}) {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);
  const t = useTranslations('FullScreen');

  const doSwitchFullScreen = () => {  // Función para alternar el estado de pantalla completa
    if (!isFullScreenActive) 
      document.body.requestFullscreen();
    else 
      document.exitFullscreen();
  };

  // useEffect para escuchar cambios en el estado de pantalla completa
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreenActive(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);    // Agregar el evento de escucha
    return () => {  // Limpieza del evento al desmontar el componente
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <SidebarMenuButton onClick={() => doSwitchFullScreen()} className='hover:bg-secondary fill-primary text-primary'>
      { !isFullScreenActive ? 
       <ExpandIcon className='stroke-[1.8] me-1 fill-black' />
       :
       <ShrinkIcon className='stroke-[1.8] me-1 fill-black' />
      }
      <span>{!isFullScreenActive ? t('enter') : t('exit')}</span>
    </SidebarMenuButton>
    // <TooltipEasy delayDuration={1000} content={isFullScreenActive ? 'Salir de pantalla completa' : 'Pantalla completa'} {...props}>         
    // </TooltipEasy>
  );
};