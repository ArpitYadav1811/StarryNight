import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { VaultMessage } from "@/types/database";

interface UseVaultReturn {
  messages: VaultMessage[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useVault = (): UseVaultReturn => {
  const [messages, setMessages] = useState<VaultMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("vault")
        .select("*")
        .order("unlock_date", { ascending: true, nullsFirst: false });

      if (fetchError) {
        throw fetchError;
      }

      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching vault messages:", err);
      setError("Failed to load messages from vault.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
  };
};
