package com.living.coding.dojo.labouffe.api;

import com.google.common.base.MoreObjects;

public final class Vote {

    public final String user;

    public Vote(String user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Vote vote = (Vote) o;

        return user != null ? user.equals(vote.user) : vote.user == null;
    }

    @Override
    public int hashCode() {
        return user != null ? user.hashCode() : 0;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
                .add("user", user)
                .toString();
    }
}
