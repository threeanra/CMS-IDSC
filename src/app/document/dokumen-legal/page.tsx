"use client";
import Button from "@/app/components/button/button";
import DataTable from "@/app/components/datatable/datatable";
import Header from "@/app/components/header/header";
import Input from "@/app/components/input/input";
import TextArea from "@/app/components/textarea/textarea";
import dummy from "@/app/dummy/dummy";
import { faArrowLeft, faFile } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

interface iDokumenLegal {
  id: number;
  name: string;
  type: string;
  email: string;
  phone: string;
  address: string;
}

export default function DokumenLegal() {
  const [step, setStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState<iDokumenLegal | null>(null);

  // Function to handle the "Lihat" button click
  const handleViewDetails = (item: iDokumenLegal) => {
    setSelectedItem(item); // Save the selected item
    setStep(1); // Move to the next view
  };

  return (
    <>
      <Header title="Dokumen Legal" icon={faFile} />
      <div className="pb-10">
        {step === 0 ? (
          <div className="flex flex-col gap-4">
            <div className="text-lg font-bold">Data Dokumen Legal</div>
            <DataTable data={dummy} onViewDetails={handleViewDetails} />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <Button
                title="Kembali"
                size="md"
                icon={faArrowLeft}
                onClick={() => setStep(0)}
              />
            </div>
            {selectedItem && (
              <div>
                <Input
                  type="text"
                  label="Nama Bisnis Owner"
                  value={selectedItem.name}
                />
                <Input type="text" label="Tipe" value={selectedItem.type} />
                <Input type="text" label="Email" value={selectedItem.email} />
                <Input type="text" label="Phone" value={selectedItem.phone} />
                <TextArea label="Address" value={selectedItem.address} />
              </div>
            )}
            <div className="flex justify-end gap-2 flex-col md:flex-row">
              <Button title="Ditinjau" size="md" onClick={() => {}} />
              <Button
                color="neutral"
                title="Menunggu"
                size="md"
                onClick={() => {}}
              />
              <Button
                color="error"
                title="Tolak"
                size="md"
                onClick={() => {}}
              />
              <Button
                color="success"
                title="Setujui"
                size="md"
                onClick={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
