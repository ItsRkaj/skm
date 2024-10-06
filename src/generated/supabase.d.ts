export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      event_attendees: {
        Row: {
          event_id: number;
          user_id: string;
        };
        Insert: {
          event_id?: number;
          user_id: string;
        };
        Update: {
          event_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'event_attendees_event_id_fkey';
            columns: ['event_id'];
            isOneToOne: false;
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_attendees_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      events: {
        Row: {
          description: string | null;
          end_time: string;
          id: number;
          invitation_type: Database['public']['Enums']['invitation_category'];
          location: string;
          organizer: string;
          price: number;
          publisher: string;
          registration_deadline: string | null;
          registration_link: string | null;
          start_time: string;
          title: string;
        };
        Insert: {
          description?: string | null;
          end_time: string;
          id?: number;
          invitation_type: Database['public']['Enums']['invitation_category'];
          location: string;
          organizer: string;
          price: number;
          publisher: string;
          registration_deadline?: string | null;
          registration_link?: string | null;
          start_time: string;
          title: string;
        };
        Update: {
          description?: string | null;
          end_time?: string;
          id?: number;
          invitation_type?: Database['public']['Enums']['invitation_category'];
          location?: string;
          organizer?: string;
          price?: number;
          publisher?: string;
          registration_deadline?: string | null;
          registration_link?: string | null;
          start_time?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'events_publisher_fkey';
            columns: ['publisher'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      leaderboard: {
        Row: {
          id: string;
          medals: number;
          not_sewn_patches: number;
          pins: number;
          sewn_patches: number;
        };
        Insert: {
          id: string;
          medals?: number;
          not_sewn_patches?: number;
          pins?: number;
          sewn_patches?: number;
        };
        Update: {
          id?: string;
          medals?: number;
          not_sewn_patches?: number;
          pins?: number;
          sewn_patches?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'leaderboard_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      quotes: {
        Row: {
          author: string | null;
          id: number;
          quotetext: string | null;
        };
        Insert: {
          author?: string | null;
          id?: number;
          quotetext?: string | null;
        };
        Update: {
          author?: string | null;
          id?: number;
          quotetext?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role_name: string | null;
        };
        Insert: {
          id?: number;
          role_name?: string | null;
        };
        Update: {
          id?: number;
          role_name?: string | null;
        };
        Relationships: [];
      };
      user_titles: {
        Row: {
          id: number;
          title: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          allergies: string | null;
          avatar_url: string | null;
          birthday: string | null;
          email: string | null;
          first_name: string | null;
          id: string;
          last_name: string | null;
          motto: string | null;
          nickname: string | null;
          phone_number: string | null;
          role: number | null;
          title: number | null;
          updated_at: string | null;
        };
        Insert: {
          allergies?: string | null;
          avatar_url?: string | null;
          birthday?: string | null;
          email?: string | null;
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          motto?: string | null;
          nickname?: string | null;
          phone_number?: string | null;
          role?: number | null;
          title?: number | null;
          updated_at?: string | null;
        };
        Update: {
          allergies?: string | null;
          avatar_url?: string | null;
          birthday?: string | null;
          email?: string | null;
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          motto?: string | null;
          nickname?: string | null;
          phone_number?: string | null;
          role?: number | null;
          title?: number | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_role_fkey';
            columns: ['role'];
            isOneToOne: false;
            referencedRelation: 'user_roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'profiles_title_fkey';
            columns: ['title'];
            isOneToOne: false;
            referencedRelation: 'user_titles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      invitation_category: 'Everyone' | 'Aktiva' | 'Gamlingar';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
