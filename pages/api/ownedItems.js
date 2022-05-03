import { FetchStaticData, MediaFetchAgent } from "@zoralabs/nft-hooks"
import { chainId, contractAddress } from '@lib/constants'

module.exports = async (req, res) => {
  const { owner } = req.query;
  if (!owner) {
    return res.status(403).json({ failed: true });
  }

  const fetchAgent = new MediaFetchAgent(
    chainId
  );

  const tokens = await FetchStaticData.fetchUserOwnedNFTs(
    fetchAgent,
    {
      collectionAddresses: contractAddress
        ? (contractAddress).split(",")
        : undefined,
      userAddress: owner,
      limit: 200,
      offset: 0,
    },
    true
  );
  res.status(200).json({ tokens });
};
