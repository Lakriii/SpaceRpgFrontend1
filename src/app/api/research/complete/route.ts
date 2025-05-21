import type { NextApiRequest, NextApiResponse } from 'next';

// Tu by si mal mať prístup k DB - tu len simulujeme
let researchDB = [
  // Tu simuluj svoju štruktúru dát so stavmi, podobne ako researchData na klientovi
];

// Funkcia na aktualizáciu statusu a odomknutie ďalšieho
function completeResearch(id: number) {
  // Nájde výskum a označí ako completed
  // Odomkne ďalší podľa parent_id (príklad logiky)
  let updated = false;

  researchDB = researchDB.map((node) => {
    if (node.id === id) {
      node.status = 'completed';
      updated = true;
    }
    if (updated && node.parent_id === id && node.status === 'locked') {
      node.status = 'unlocked';
    }
    // aktualizuj aj subResearch ak treba
    if (node.subResearch) {
      node.subResearch = node.subResearch.map((sub: any) => {
        if (sub.id === id) {
          sub.status = 'completed';
          updated = true;
        }
        if (updated && sub.parent_id === id && sub.status === 'locked') {
          sub.status = 'unlocked';
        }
        return sub;
      });
    }
    return node;
  });

  return researchDB;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const { id } = req.body;
  if (typeof id !== 'number') {
    res.status(400).json({ message: 'Invalid id' });
    return;
  }

  const updatedData = completeResearch(id);

  res.status(200).json(updatedData);
}
