"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store";
import {
  ChevronDown,
  Download,
  Eye,
  Loader2,
  LogOut,
  Pencil,
  Save,
  SaveOff,
  Share,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function Header() {
    const {isEditing, setIsEditing, name, setName} = useEditorStore()
    const {data: session} = useSession()
    const handleLogout = () => {
        signOut();
    };

    return (
        <header className="header-gradient header flex items-center justify-between px-4 h-14">
        <div className="flex items-center space-x-2">
            <Link href={"/"}>
            <Image
                src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg"
                alt="canva"
                width={70}
                height={30}
                priority
            />
            </Link>
            <DropdownMenu>
            <DropdownMenuTrigger asChild="true">
                <button className="header-button flex items-center text-white">
                <span>{isEditing ? "Editing" : "Viewing"}</span>
                <ChevronDown className="ml-1 h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setIsEditing(true)} className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4 cursor-pointer" />
                <span>Editing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEditing(false)} className="cursor-pointer">
                <Eye className="mr-2 h-4 w-4 cursor-pointer" />
                <span>Viewing</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            <button
            className={
                "relative flex items-center justify-center p-1.5 rounded-md hover:bg-muted transition-colors"
            }
            // title={saveStatus !== "Saving..." ? "Save" : saveStatus}
            // disabled={saveStatus === "Saving..."}
            >
            {/* {saveStatus === "Saving..." ? (
                <div className="relative flex items-center">
                <Loader2 className="h-5 w-5 animate-spin text-white" />
                <span className="sr-only">Saving...</span>
                </div>
            ) : (
                <Save
                className={cn("h-5 w-5", saveStatus === "Saved" && "text-white")}
                />
            )}

            {saveStatus === "Saving..." && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
            )} */}
            </button>
            <button
            // onClick={handleExport}
            className="header-button ml-3 relative"
            title="Export"
            >
            <Download className="w-5 h-5" />
            </button>
        </div>
        <div className="flex-1 flex justify-center max-w-md">
            <Input
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="flex items-center space-x-3">
            <button
            onClick={() => setShowPremiumModal(true)}
            className="upgrade-button flex items-center bg-white/10 hover:bg-white/20 text-white rounded-md h-9 px-3 transition-colors cursor-pointer"
            >
            <Star className="mr-1 h-4 w-4 text-yellow-400" />
            <span>
                Upgrade to Premium
                {/* {!userSubscription?.isPremium */}
                {/* ? "Upgrade To Premium" */}
                {/* : "Premium Member"} */}
            </span>
            </button>
            <DropdownMenu>
            <DropdownMenuTrigger aschild="true">
                <div className="flex items-center space-x-2 ">
                <Avatar>
                    <AvatarFallback>
                    {/* { "U"} */}
                    {session?.user?.name?.[0] || "U"}
                    </AvatarFallback>
                    <AvatarImage
                    // src={ "/placeholder-user.jpg"}
                    src={session?.user?.image || "/placeholder-user.jpg"}
                    />
                </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                onClick={handleLogout}
                className={"cursor-pointer"}
                >
                <LogOut className="mr-2 w-4 h-4" />
                <span className="font-bold">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {/* <ExportModal isOpen={showExportModal} onClose={setShowExportModal} /> */}
        </header>
    );
}