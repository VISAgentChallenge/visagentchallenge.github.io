import React, { useEffect, useState } from "react";
import { Users, Plus, Loader2, Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "@/components/ui/table";

interface Teammate {
  name: string;
  email: string;
}

const Teammates: React.FC = () => {
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newTeammate, setNewTeammate] = useState<Teammate>({ name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [deletingIdx, setDeletingIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeammates = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/user/teammates");

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error);
        }

        const data = await res.json();
        setTeammates(data.teammates || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchTeammates();
  }, []);

  const handleAddTeammate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeammate.name || !newTeammate.email) {
      toast.error("Please provide both name and email");
      return;
    }
    setSaving(true);
    try {
      const updated = [...teammates, newTeammate];
      const res = await fetch("/api/user/teammates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teammates: updated }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      setTeammates(updated);
      setNewTeammate({ name: "", email: "" });
      toast.success("Teammate added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTeammate = async (idx: number) => {
    setDeletingIdx(idx);
    try {
      const updated = teammates.filter((_, i) => i !== idx);
      const res = await fetch("/api/user/teammates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teammates: updated }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      setTeammates(updated);
      toast.success("Teammate removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setDeletingIdx(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl mb-0 font-bold">Your teammates</h2>
      <span>Add in your teammates here if your submission involves multiple people.</span>
      <div className="flex flex-col gap-3 shadow-none rounded-md">
        <div className="flex flex-col gap-6">
          {loading ? (
            <div className="bg-neutral-50 rounded-sm flex justify-center items-center gap-2 text-neutral-500 min-h-20 w-full text-sm">
              <Loader2 className="animate-spin" /> Loading teammates
            </div>
          ) : error ? (
            <div className="bg-neutral-50 rounded-sm flex justify-center items-center gap-2 text-red-500 min-h-20 w-full text-sm">
              <AlertCircle className="size-6" /> {error}
            </div>
          ) : teammates.length === 0 ? (
            <div className="text-sm rounded-sm bg-neutral-50 justify-center text-neutral-500 flex items-center gap-2 min-h-20">
              <Users className="size-5" />
              You haven't added any teammates yet.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-sm">
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow className="bg-neutral-100 hover:bg-neutral-100">
                    <TableHead className="w-1/3 pl-4">Name</TableHead>
                    <TableHead className="w-1/2">Email</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teammates.map((teammate, idx) => (
                    <TableRow key={idx} className="group">
                      <TableCell className="text-sm pl-4">{teammate.name}</TableCell>
                      <TableCell className="text-sm">{teammate.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="invisible group-hover:visible transition-none"
                          onClick={() => handleDeleteTeammate(idx)}
                          disabled={deletingIdx === idx}
                        >
                          {deletingIdx === idx ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4 text-red-500" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium">Add a teammate</span>
            <form
              onSubmit={handleAddTeammate}
              className="flex justify-between gap-2 w-full flex-wrap"
            >
              <div className="flex w-full md:w-2/3 gap-2">
                <Input
                  placeholder="Name"
                  value={newTeammate.name}
                  onChange={(e) => setNewTeammate((t) => ({ ...t, name: e.target.value }))}
                  className="shadow-none rounded-sm"
                  disabled={saving}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newTeammate.email}
                  onChange={(e) => setNewTeammate((t) => ({ ...t, email: e.target.value }))}
                  className="shadow-none rounded-sm"
                  disabled={saving}
                />
              </div>
              <Button type="submit" disabled={saving} className="shadow-none w-full md:w-fit">
                <Plus className="size-4 mr-1" /> Add Teammate
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammates;
