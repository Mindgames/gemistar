# Database Structure

## Table: user_settings

| Column Name     | Data Type                   |
| --------------- | --------------------------- |
| id              | uuid                        |
| user_id         | uuid                        |
| platform        | USER-DEFINED                |
| name            | text                        |
| company_name    | text                        |
| additional_info | text                        |
| response_style  | text                        |
| created_at      | timestamp without time zone |
| updated_at      | timestamp without time zone |

## Table: product_features

| Column Name | Data Type                |
| ----------- | ------------------------ |
| id          | bigint                   |
| created_at  | timestamp with time zone |
| feature     | text                     |
| product_id  | text                     |
| order       | numeric                  |

## Table: user_actions

| Column Name | Data Type                |
| ----------- | ------------------------ |
| id          | bigint                   |
| user_id     | uuid                     |
| input       | text                     |
| output      | text                     |
| medium      | USER-DEFINED             |
| meta        | jsonb                    |
| created_at  | timestamp with time zone |

## Table: users

| Column Name                 | Data Type                   |
| --------------------------- | --------------------------- |
| id                          | uuid                        |
| full_name                   | text                        |
| avatar_url                  | text                        |
| billing_address             | jsonb                       |
| payment_method              | jsonb                       |
| super_user                  | boolean                     |
| subscriptions               | text                        |
| created_at                  | timestamp without time zone |
| updated_at                  | timestamp without time zone |
| quota                       | numeric                     |
| quota_used                  | numeric                     |
| current_period_start        | timestamp with time zone    |
| current_period_end          | timestamp with time zone    |
| status                      | USER-DEFINED                |
| user_type                   | USER-DEFINED                |
| instance_id                 | uuid                        |
| id                          | uuid                        |
| aud                         | character varying           |
| role                        | character varying           |
| email                       | character varying           |
| encrypted_password          | character varying           |
| email_confirmed_at          | timestamp with time zone    |
| invited_at                  | timestamp with time zone    |
| confirmation_token          | character varying           |
| confirmation_sent_at        | timestamp with time zone    |
| recovery_token              | character varying           |
| recovery_sent_at            | timestamp with time zone    |
| email_change_token_new      | character varying           |
| email_change                | character varying           |
| email_change_sent_at        | timestamp with time zone    |
| last_sign_in_at             | timestamp with time zone    |
| raw_app_meta_data           | jsonb                       |
| raw_user_meta_data          | jsonb                       |
| is_super_admin              | boolean                     |
| created_at                  | timestamp with time zone    |
| updated_at                  | timestamp with time zone    |
| phone                       | text                        |
| phone_confirmed_at          | timestamp with time zone    |
| phone_change                | text                        |
| phone_change_token          | character varying           |
| phone_change_sent_at        | timestamp with time zone    |
| confirmed_at                | timestamp with time zone    |
| email_change_token_current  | character varying           |
| email_change_confirm_status | smallint                    |
| banned_until                | timestamp with time zone    |
| reauthentication_token      | character varying           |
| reauthentication_sent_at    | timestamp with time zone    |
| is_sso_user                 | boolean                     |
| deleted_at                  | timestamp with time zone    |
| is_anonymous                | boolean                     |

## Table: customers

| Column Name        | Data Type |
| ------------------ | --------- |
| id                 | uuid      |

## Table: products

| Column Name | Data Type |
| ----------- | --------- |
| id          | text      |
| active      | boolean   |
| name        | text      |
| description | text      |
| image       | text      |
| metadata    | jsonb     |

## Table: prices

| Column Name       | Data Type    |
| ----------------- | ------------ |
| id                | text         |
| product_id        | text         |
| active            | boolean      |
| description       | text         |
| unit_amount       | bigint       |
| currency          | text         |
| type              | USER-DEFINED |
| interval          | USER-DEFINED |
| interval_count    | integer      |
| trial_period_days | integer      |
| metadata          | jsonb        |

## Table: subscriptions

| Column Name          | Data Type                |
| -------------------- | ------------------------ |
| id                   | text                     |
| user_id              | uuid                     |
| status               | USER-DEFINED             |
| metadata             | jsonb                    |
| price_id             | text                     |
| quantity             | integer                  |
| cancel_at_period_end | boolean                  |
| created              | timestamp with time zone |
| current_period_start | timestamp with time zone |
| current_period_end   | timestamp with time zone |
| ended_at             | timestamp with time zone |
| cancel_at            | timestamp with time zone |
| canceled_at          | timestamp with time zone |
| trial_start          | timestamp with time zone |
| trial_end            | timestamp with time zone |
| linked_user          | uuid                     |
