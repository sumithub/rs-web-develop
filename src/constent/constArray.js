export const USER_ACTIONS = [
    { label: "Edit User", value: "edit" },
    { label: "Suspend/Reactivate", value: "suspend/reactivate" },
    { label: "Change Role", value: "role" },
    { label: "Change Password", value: "change-password" },
    { label: "Resend Invite", value: "resend-invite" },
    { label: "Remove User", value: "remove-user" },
    { label: "Send Invite", value: "send-invite" },
    { label: "Setup Password", value: "setup-password" },
]

export const users = [
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Pending Invite", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Suspended", lastActive: "Aug 05,2024" },
    { name: "Jaydon George", role: "Manager", status: "Active", lastActive: "Aug 05,2024" },
];

export const TEMPLATE_ACTIONS = [
    { label: "Edit", value: "edit" },
    { label: "Preview", value: "preview" },
    { label: "Clone", value: "clone" },
]

export const templates = [
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "SMS", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
    { name: "Hiking template", type: "Email", subject: "Lorem ipsum....", lastUpdated: new Date('2024-06-18T10:00:00') },
];