import axios from "axios";

const BASE_URL = "https://api.aztecexplorer.xyz";

export const getBlockByNumber = async (blockNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/blocks/getByBlockNumber/${blockNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching block by number:", error);
    throw error;
  }
};

export const getBlockByHash = async (hash) => {
  try {
    const response = await axios.get(`${BASE_URL}/blocks/getByHash/${hash}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching block by hash:", error);
    throw error;
  }
};

export const getBlocks = async (page, limit, filters = {}) => {
  try {
    const params = {
      page,
      limit,
    };
    const {
      sort,
      order,
      startTimestamp,
      endTimestamp,
      minTotalFees,
      maxTotalFees,
      minTxCount,
      maxTxCount,
    } = filters;

    if (sort) params.sort = sort;
    if (order) params.order = order;
    if (startTimestamp) params.startTimestamp = startTimestamp;
    if (endTimestamp) params.endTimestamp = endTimestamp;
    if (minTotalFees) params.minTotalFees = minTotalFees;
    if (maxTotalFees) params.maxTotalFees = maxTotalFees;
    if (minTxCount) params.minTxCount = minTxCount;
    if (maxTxCount) params.maxTxCount = maxTxCount;
    const response = await axios.get(`${BASE_URL}/blocks/get`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};

export const getTransactionsByBlockNumber = async (blockNumber) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/getByBlockNumber/${blockNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions by block number:", error);
    throw error;
  }
};

export const getTransactionByHash = async (hash) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/getByHash/${hash}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction by hash:", error);
    throw error;
  }
};
export const getTransactions = async (page, limit, filters = {}) => {
  try {
    const params = {
      page,
      limit,
    };

    const {
      sort,
      order,
      startTimestamp,
      endTimestamp,
      minIndex,
      maxIndex,
      minTransactionFee,
      maxTransactionFee,
      minBlockNumber,
      maxBlockNumber,
    } = filters;

    if (sort) params.sort = sort;
    if (order) params.order = order;
    if (startTimestamp) params.startTimestamp = startTimestamp;
    if (endTimestamp) params.endTimestamp = endTimestamp;
    if (minIndex) params.minIndex = minIndex;
    if (maxIndex) params.maxIndex = maxIndex;
    if (minTransactionFee) params.minTransactionFee = minTransactionFee;
    if (maxTransactionFee) params.maxTransactionFee = maxTransactionFee;
    if (minBlockNumber) params.minBlockNumber = minBlockNumber;
    if (maxBlockNumber) params.maxBlockNumber = maxBlockNumber;
    const response = await axios.get(`${BASE_URL}/transactions/get`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const getLatestBlockNumber = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blocks/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
export const getTotalTxCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};
export const getAddress = async (address) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/accounts/getByAddress/${address}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching block by number:", error);
    throw error;
  }
};
export const getAddresses = async (page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/get`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
};

export const getAccountCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/count`);
    return response.data;
  } catch (error) {
    console.error("Error fetching block by hash:", error);
    throw error;
  }
};
export const getSearchResults = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching block by hash:", error);
    throw error;
  }
};
