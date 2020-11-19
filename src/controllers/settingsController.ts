import { Request, Response, Router } from 'express';
import { Vendor } from '../enum/Vendor';
export const settingsRouter = Router();

settingsRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    vendors: {
      [Vendor.NTUC]: {
        id: Vendor.NTUC,
        name: 'Fairprice',
        link: 'https://www.fairprice.com.sg/cart'
      },
      [Vendor.ShengSiong]: {
        id: Vendor.ShengSiong,
        name: 'Sheng Siong',
        link: 'https://www.allforyou.sg/cart'
      },
      [Vendor.Giant]: {
        id: Vendor.Giant,
        name: 'Giant',
        link: 'https://giant.sg/checkout/cart'
      },
      [Vendor.ColdStorage]: {
        id: Vendor.ColdStorage,
        name: 'Cold Storage',
        link: 'https://coldstorage.com.sg/checkout/cart'
      }
    },
    queryStatus: {
      [Vendor.NTUC]: {
        isLoading: false,
        startDateTime: null,
        endDateTime: null
      },
      [Vendor.ShengSiong]: {
        isLoading: false,
        startDateTime: null,
        endDateTime: null
      },
      [Vendor.Giant]: {
        isLoading: false,
        startDateTime: null,
        endDateTime: null
      },
      [Vendor.ColdStorage]: {
        isLoading: false,
        startDateTime: null,
        endDateTime: null
      }
    }
  });
});
