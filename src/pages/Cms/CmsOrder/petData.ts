interface ItranslateService{
  [key:string]:string
}

interface sortService{
  [key:string]:string
}

export const translateService:ItranslateService = {
  contract:'簽署合約',
  shower:'洗澡服務',
  walkdog:'遛狗服務',
  pickup:'接送服務',
  '24hrMonitor':'24小時寵物監視器',
  '24hrClerks':'24小時人員駐店',
  hospital:'與醫療院所配合',
  lifeRecord:'提供寵物生活紀錄',
  independentZone:'生活空間與其他寵物分開',
  yard:'廣大庭院'

};
export const sortService:sortService={
  contract:'Services',shower:'Services',walkdog:'Services',pickup:'Services',
  '24hrMonitor':'Facilities','24hrClerks':'Facilities',hospital:'Facilities',
  lifeRecord:'Specials',independentZone:'Specials',yard:'Specials '

}





