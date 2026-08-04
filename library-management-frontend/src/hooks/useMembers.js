import { useEffect, useState } from "react";
import memberService from "../services/memberService";

const useMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await memberService.getAllMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const addMember = async (member) => {
    await memberService.addMember(member);
    await loadMembers();
  };

  const updateMember = async (id, member) => {
    await memberService.updateMember(id, member);
    await loadMembers();
  };

  const deleteMember = async (id) => {
    await memberService.deleteMember(id);
    await loadMembers();
  };

  return {
    members,
    loading,
    error,
    loadMembers,
    addMember,
    updateMember,
    deleteMember,
  };
};

export default useMembers;