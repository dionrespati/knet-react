import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemberInfo = create(
  persist(
    (set, get) => ({
      userlogin: 'BLM ADA ID',
      idmember: 'SAMA JUGA',
      namamember: 'TESTING DION',
      bonusperiod: '',
      tel_hp: '',
      email: '',

      setuserLogin: (newUserLogin) => {
        set({ userlogin: newUserLogin });
      },

      setIdMember: (newIdMember) => {
        set({ idmember: newIdMember });
      },

      setNamaMember: (newNamaMemokber) => {
        set({ namamember: newNamaMember });
      },

      setBonusPeriod: (newBonusPeriod) => {
        set({ bonusperiod: newBonusPeriod });
      },

      setuserLogin: (newUserLogin) => {
        set({ userlogin: newUserLogin });
      },

      setTelpMember: (newtelpMember) => {
        set({ tel_hp: newtelpMember });
      },

      setEmail: (newEmail) => {
        set({ email: newEmail });
      },
    }),
    {
      name: 'member-info',
      getStorage: () => localStorage,
    }
  )
);

export default useMemberInfo;
