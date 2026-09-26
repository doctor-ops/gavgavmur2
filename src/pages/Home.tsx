import { SmartServices } from '@/components/SmartServices';
import { Breeds } from '@/components/Breeds';
import { Care } from '@/components/Care';
import { FoodTypes } from '@/components/FoodTypes';
import { Contacts } from '@/components/Contacts';

export function Home() {
  return (
    <div className="bg-base-bg">
      {/* 
         ШАГ 1: Проверяем только SmartServices. 
         Если сайт заработал — значит этот блок здоров.
      */}
      <SmartServices /> 

      {/* 
         ШАГ 2: Когда SmartServices заработает, удаляйте комментарии ниже по одному.
         Сначала <Breeds />, потом <Care /> и так далее.
      */}
      {/* <Breeds /> */}
      {/* <Care /> */}
      {/* <FoodTypes /> */}
      {/* <Contacts /> */}
    </div>
  );
}
