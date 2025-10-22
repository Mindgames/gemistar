# Database Structure

## Table: user_settings

| Column Name     | Data Type                   |
| --------------- | --------------------------- |
| id              | uuid                        |
| user_id         | uuid                        |
| platform        | USER-DEFINED                |
| created_at      | timestamp without time zone |
| updated_at      | timestamp with time zone    |
| additional_info | text                        |
| response_style  | text                        |
| name            | text                        |
| company_name    | text                        |

## Table: task_templates

| Column Name | Data Type                |
| ----------- | ------------------------ |
| template_id | bigint                   |
| points      | integer                  |
| created_at  | timestamp with time zone |
| description | text                     |

## Table: tasks

| Column Name  | Data Type                |
| ------------ | ------------------------ |
| task_id      | bigint                   |
| user_id      | uuid                     |
| template_id  | bigint                   |
| is_completed | boolean                  |
| created_at   | timestamp with time zone |

## Table: product_features

| Column Name | Data Type                |
| ----------- | ------------------------ |
| id          | bigint                   |
| created_at  | timestamp with time zone |
| order       | numeric                  |
| feature     | text                     |
| product_id  | text                     |

## Table: user_actions

| Column Name    | Data Type                |
| -------------- | ------------------------ |
| execution_time | double precision         |
| user_id        | uuid                     |
| json           | jsonb                    |
| id             | bigint                   |
| medium         | USER-DEFINED             |
| meta           | jsonb                    |
| created_at     | timestamp with time zone |
| input          | text                     |
| output         | text                     |

## Table: users

| Column Name                 | Data Type                   |
| --------------------------- | --------------------------- |
| id                          | uuid                        |
| recovery_sent_at            | timestamp with time zone    |
| email_change_sent_at        | timestamp with time zone    |
| last_sign_in_at             | timestamp with time zone    |
| raw_app_meta_data           | jsonb                       |
| raw_user_meta_data          | jsonb                       |
| is_super_admin              | boolean                     |
| created_at                  | timestamp with time zone    |
| updated_at                  | timestamp with time zone    |
| phone_confirmed_at          | timestamp with time zone    |
| phone_change_sent_at        | timestamp with time zone    |
| confirmed_at                | timestamp with time zone    |
| email_change_confirm_status | smallint                    |
| banned_until                | timestamp with time zone    |
| reauthentication_sent_at    | timestamp with time zone    |
| is_sso_user                 | boolean                     |
| deleted_at                  | timestamp with time zone    |
| is_anonymous                | boolean                     |
| billing_address             | jsonb                       |
| payment_method              | jsonb                       |
| super_user                  | boolean                     |
| created_at                  | timestamp without time zone |
| updated_at                  | timestamp without time zone |
| quota                       | numeric                     |
| quota_used                  | numeric                     |
| current_period_start        | timestamp with time zone    |
| current_period_end          | timestamp with time zone    |
| status                      | USER-DEFINED                |
| user_type                   | USER-DEFINED                |
| quota_lifetime              | numeric                     |
| activated_extension         | boolean                     |
| instance_id                 | uuid                        |
| id                          | uuid                        |
| email_confirmed_at          | timestamp with time zone    |
| invited_at                  | timestamp with time zone    |
| confirmation_sent_at        | timestamp with time zone    |
| full_name                   | text                        |
| avatar_url                  | text                        |
| email_change                | character varying           |
| phone_change_token          | character varying           |
| aud                         | character varying           |
| subscriptions               | text                        |
| role                        | character varying           |
| email                       | character varying           |
| encrypted_password          | character varying           |
| email_change_token_current  | character varying           |
| phone                       | text                        |
| confirmation_token          | character varying           |
| reauthentication_token      | character varying           |
| recovery_token              | character varying           |
| email                       | text                        |
| phone_change                | text                        |
| email_change_token_new      | character varying           |

## Table: customers

| Column Name        | Data Type |
| ------------------ | --------- |
| id                 | uuid      |

## Table: products

| Column Name | Data Type |
| ----------- | --------- |
| active      | boolean   |
| metadata    | jsonb     |
| id          | text      |
| name        | text      |
| description | text      |
| image       | text      |

## Table: prices

| Column Name       | Data Type    |
| ----------------- | ------------ |
| interval          | USER-DEFINED |
| interval_count    | integer      |
| trial_period_days | integer      |
| metadata          | jsonb        |
| unit_amount       | bigint       |
| active            | boolean      |
| type              | USER-DEFINED |
| currency          | text         |
| product_id        | text         |
| description       | text         |
| id                | text         |

## Table: subscriptions

| Column Name          | Data Type                |
| -------------------- | ------------------------ |
| linked_user          | uuid                     |
| user_id              | uuid                     |
| status               | USER-DEFINED             |
| metadata             | jsonb                    |
| trial_start          | timestamp with time zone |
| trial_end            | timestamp with time zone |
| quantity             | integer                  |
| cancel_at_period_end | boolean                  |
| created              | timestamp with time zone |
| current_period_start | timestamp with time zone |
| current_period_end   | timestamp with time zone |
| ended_at             | timestamp with time zone |
| cancel_at            | timestamp with time zone |
| canceled_at          | timestamp with time zone |
| price_id             | text                     |
| id                   | text                     |
