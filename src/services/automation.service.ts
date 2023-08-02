/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-hot-toast';
import { IAutomation } from '../constants/types/automation.types';
import axiosInstance, { handleGetRequest, handlePostRequest } from '../utils/api/axios';

const createNewAutomation = async (automation: any) => {
  try {
    const result = await handlePostRequest('/automation', automation);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getAutomation = async (id: string) => {
  try {
    const result = await axiosInstance.get(`/automations/${id}`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getAllAutomations = async (): Promise<IAutomation[] | undefined> => {
  try {
    const { data, message, status } = await handleGetRequest('/automations');
    return data;
  } catch (error) {
    console.log(error);
  }
};

const handleToggleStatus = async (id: string, aStatus: string): Promise<any> => {
  try {
    const result = await axiosInstance.put(`/automations/toggle/${id}`, { status: aStatus });
    console.log(result);
    const { status, data } = result;
    return { status, data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const handleToggleStatusNew = async (id: string, platfrom: string, status: boolean): Promise<any> => {
  try {
    const result = await axiosInstance.put(`/${platfrom}/${id}/toggle`, { status });
    return result;
  } catch (error: any) {
    console.log(error.response);
    toast.error(error.response.data.message);
    return error.response;
  }
};

export const automationService = {
  createNewAutomation,
  handleToggleStatusNew,
  getAllAutomations,
  getAutomation,
  handleToggleStatus,
};
