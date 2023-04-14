import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMemberInfo = create(
  persist(
    (set, get) => ({
      userlogin: 'IDSPAAA66834',
      loginname: 'JHON DOE',
      memberId: 'IDSPAAA66834',
      memberName: 'JHON DOE',
      bonusPeriod: '',
      tel_hp: '',
      email: '',

      fetchMemberInfoFromStorage: () => {
        let memberInfoData;
        if (typeof window !== 'undefined') {
          memberInfoData = JSON.parse(sessionStorage.getItem('member-info'));
        }

        if (
          memberInfoData &&
          memberInfoData.items !== undefined &&
          memberInfoData.items.length > 0
        ) {
          set(() => ({
            userlogin: memberInfoData.userlogin,
            idmember: memberInfoData.idmember,
            namamember: memberInfoData.namamember,
            bonusperiod: memberInfoData.bonusperiod,
            tel_hp: memberInfoData.tel_hp,
            email: memberInfoData.email,
          }));
        }
      },
    }),
    {
      name: 'member-info',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// panggil fetchMemberInfoFromStorage saat pertama kali inisialisasi store
useMemberInfo.getState().fetchMemberInfoFromStorage();

export default useMemberInfo;
