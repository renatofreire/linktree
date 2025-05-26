"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import Modal from "../Modal";
import Form from "../Form";
import { Button } from "../Button";

import profileAction from "./profileAction";

export default function ProfileForm() {
  const { user, setUser } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [name, setName] = useState(user?.name || "");

  const [state, formAction, isPending] = useActionState(profileAction, null);

  const onModalClose = useCallback(() => {
    const bio = state?.bio || user?.bio || "";
    const name = state?.name || user?.name || "";
    setBio(bio);
    setName(name);
    setShowForm(false);
  }, [state, user]);

  useEffect(() => {
    if (state) {
      setUser(state);
      onModalClose();
    }
  }, [onModalClose, state, setUser]);

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex flex-col items-start cursor-pointer"
      >
        <p className="text-2xl font-bold">{user?.name}</p>
        <p className="text-gray-700">{user?.bio}</p>
      </button>

      {showForm && (
        <>
          <Modal onBackdropClick={onModalClose}>
            <Form.Root action={formAction}>
              <Form.Title>Display name and Bio</Form.Title>
              <Form.Input
                type="text"
                name="name"
                value={name}
                label="Display name"
                onChange={(e) => setName(e.target.value)}
              />

              <div className="my-4">
                <Form.Input
                  type="text"
                  name="bio"
                  value={bio}
                  label="Bio"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-2">
                <Button onClick={onModalClose} variant="secondary">
                  Cancel
                </Button>
                <Form.Submit disabled={isPending} isLoading={isPending}>
                  Save
                </Form.Submit>
              </div>
            </Form.Root>
          </Modal>
        </>
      )}
    </>
  );
}
