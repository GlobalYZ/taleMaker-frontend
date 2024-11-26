import { View, Switch, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { getUserRole } from "@/api/auth";

// 修复类型定义的语法错误
type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export default function Admin() {
  // 示例用户数据
  const [users, setUsers] = useState<User[]>([
    { id: "1", email: "john@example.com", isAdmin: true },
    { id: "2", email: "mary@example.com", isAdmin: false },
    { id: "3", email: "david@example.com", isAdmin: false },
  ]);

  const toggleUserRole = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };

  useEffect(() => {
    const checkRole = async () => {
      const role = await getUserRole();
      console.log("Current user role:", role);
    };

    checkRole();
  }, []);

  return (
    <View className="flex-1 bg-bg-primary">
      <ThemedText className="text-xl font-bold mb-4 p-4 text-white">
        User Management
      </ThemedText>

      <ScrollView className="flex-1">
        <View className="px-4">
          <View className="flex-row bg-primary p-3 rounded-t">
            <ThemedText className="flex-1 font-bold">Email</ThemedText>
            <ThemedText className="w-24 font-bold">Role</ThemedText>
            <ThemedText className="w-16 font-bold">Toggle</ThemedText>
          </View>

          {users.map((user) => (
            <View
              key={user.id}
              className="flex-row border-b border-bg-secondary bg-bg-secondary p-3"
            >
              <ThemedText className="flex-1">{user.email}</ThemedText>
              <ThemedText className="w-24">
                {user.isAdmin ? "Admin" : "User"}
              </ThemedText>
              <View className="w-16">
                <Switch
                  value={user.isAdmin}
                  onValueChange={() => toggleUserRole(user.id)}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={user.isAdmin ? "#f5dd4b" : "#f4f3f4"}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
